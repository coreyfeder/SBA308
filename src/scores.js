/* 
Per Scholas SE 2024-RTT-03 – SBA 308
Corey Feder
https://perscholas.instructure.com/courses/1923/assignments/355959
https://www.canva.com/design/DAFxJzEGlWs/OxnBpoTDbneAidu7eN9WLw/view
*/

/* 
All of this data—incoming and outgoing—is the wrong shape. That's what's making every potential solution so unpleasant.
Okay, forgoing elegant reductionism to make something pleasing to work with.
*/

const CutoffDate = new Date().toISOString().substring(0, 10); // yield 'YYYY-MM-DD'
// Ignore assignments not due before this time.
// _Of course_ we're only using ISO-8601. We're not _animals_.
let submissionsTree = {};

function pointsPossible(assignmentId) {
    // Note this WILL return 0 if the assignment ID is not found in the group.
    // This is for extra credit assignments. Assignment ID does not need to be included in group.
    // Points scored will be added to total, while total points possible will not be increased.
    // Nah, it's okay; I added it to the spec.
    let result = 0;
    for (let assignment of AssignmentGroup.assignments) {
        if (assignmentId == assignment.id) {
            result = assignment.points_possible;
            break;
        }
    }
    return result;
}

function dueDate(assignmentId) {
    let result;
    for (let assignment of AssignmentGroup.assignments) {
        if (assignmentId == assignment.id) {
            result = assignment.due_at;
            break;
        }
    }

    if (result == undefined) {
        // assignmentId not found? Run with that "extra credit" idea. Give it the minimum date.
        result = new Date(0).toISOString().substring(0, 10);
    } else if (isNaN(Date.parse(result))) {
        throw "Assignment does not have a valid date.";
    } else {
        return result;
    }
}

function growSubmissionsTree() {
    for (let submission of LearnerSubmissions) {
        const learnerId = submission.learner_id;
        const assignmentId = submission.assignment_id;
        if (!(learnerId in submissionsTree)) {
            // create an entry for the learner if they don't exist
            submissionsTree[learnerId] = {};
        } else if (assignmentId in submissionsTree[learnerId]) {
            // check for this assignment already having been submitted
            let errorMsg = `Assignment has already been submitted for this learner (learner ${learnerId}, assignment ${assignmentId})`;
            log("ERROR: " + errorMsg);
            throw errorMsg;
        }
        submissionsTree[learnerId][assignmentId] = {
            dateDue: dueDate(assignmentId),
            dateSubmitted: submission.submission.submitted_at,
            scoreRaw: submission.submission.score,
            scoreMax: pointsPossible(assignmentId),
        };
    }
    return submissionsTree;
}

function pruneSubmissionsTree(CutoffDate, latenessPenalty) {
    for (let learnerId in submissionsTree) {
        // log("");
        // log(learnerId);
        // log(submissionsTree[learnerId]);
        for (let assignmentId in submissionsTree[learnerId]) {
            let assignment = submissionsTree[learnerId][assignmentId]; // for readability
            // log(assignmentId);
            // log(assignment);
            // prune assignments not yet due
            if (assignment.dateDue > CutoffDate) {
                // log(`Removing an assignment not yet due (learner ${learnerId}, assignment ${assignmentId}, ${assignment.dateDue} > ${CutoffDate}`);
                delete submissionsTree[learnerId][assignmentId];
            } else if (assignment.dateSubmitted > assignment.dateDue) {
                // check for late assignments
                submissionsTree[learnerId][
                    assignmentId
                ].scoreAdjusted = latenessPenalty(assignment);
            } else {
                submissionsTree[learnerId][assignmentId].scoreAdjusted =
                    assignment.scoreRaw;
            }
        }
    }
}

function latenessPenalty(assignmentBranch) {
    // Just subtracting 10% of max.
    let penaltyPercentOffMax = 0.1; // flat penalty off max
    // Minimum score per assignment is 0. Don't subtract more points than were earned.
    return Math.max(
        0,
        assignmentBranch.scoreRaw - assignmentBranch.scoreMax * penaltyPercentOffMax,
    );
}

function buildOutputPayload() {
    const payload = [];
    for (let learnerId in submissionsTree) {
        let learner = {
            id: learnerId,
            runningTotal: 0.0,
            runningMax: 0.0,
        };
        for (let assignmentId in submissionsTree[learnerId]) {
            learner[assignmentId] =
                submissionsTree[learnerId][assignmentId].scoreAdjusted;
            learner.runningTotal +=
                submissionsTree[learnerId][assignmentId].scoreAdjusted;
            learner.runningMax += submissionsTree[learnerId][assignmentId].scoreMax;
        }
        learner.avg = learner.runningTotal / learner.runningMax;
        delete learner.runningTotal;
        delete learner.runningMax;
        payload.push(learner);
    }
    return payload;
}

function getLearnerData(
    CourseInfo, // ONE CourseInfo object
    AssignmentGroup, // ONE AssignmentGroup (which includes an ARRAY of AssignmentInfo)
    LearnerSubmissions, // ARRAY of LearnerSubmission
) {
    growSubmissionsTree(); // no return; edits global
    pruneSubmissionsTree(CutoffDate, latenessPenalty); // no return; edits global

    // TODO: the current version of submissionsTree could have gone
    //       directly into the results. (u__u);
    let result = buildOutputPayload();
    return result;
} // end getLearnerData

if (
    typeof CourseInfo == "undefined" ||
    typeof AssignmentGroup == "undefined" ||
    typeof LearnerSubmissions == "undefined" ||
    Boolean(CourseInfo) ||
    Boolean(AssignmentGroup) ||
    Boolean(LearnerSubmissions)
) {
    console.log("getLearnerData loaded, but no input data found.");
} else {
    getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
}
