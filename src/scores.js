/*-  Test Data  -*/

const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

const CutoffDate = new Date().toISOString().substring(0, 10);  // yield 'YYYY-MM-DD'
// Ignore assignments not due before this time.
// _Of course_ we're only using ISO-8601. We're not _animals_.


/*-  Helpers  -*/

function clg(...args) { console.log(...args); };


/*-  Primary  -*/

function getLearnerData(
    CourseInfo,             // ONE CourseInfo object
    AssignmentGroup,        // ONE AssignmentGroup (which includes an ARRAY of AssignmentInfo)
    LearnerSubmissions,     // ARRAY of LearnerSubmission
) {

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
            };
        };
        return result;
    };

    function dueDate(assignmentId) {
        let result;
        for (let assignment of AssignmentGroup.assignments) {
            if (assignmentId == assignment.id) {
                result = assignment.due_at;
                break;
            };
        };

        if (result == undefined) {
            // assignmentId not found? Run with that "extra credit" idea. Give it the minimum date.
            result = new Date(0).toISOString().substring(0, 10);
        } else if (isNaN(Date.parse(result))) {
            // TODO: handle this
            throw "Assignment does not have a valid date.";
        } else {
            return result;
        };
    };

    function growSubmissionsTree() {
        clg('\nDEBUG: beginning growSubmissionsTree');
        for (let submission of LearnerSubmissions) {
            clg('\nDEBUG: checking loop counter `submission`');
            clg(submission);
            const learnerId = submission.learner_id;
            const assignmentId = submission.assignment_id;
            clg(`learnerId: ` + learnerId);
            clg(`assignmentId: ` + assignmentId);
            if (!(learnerId in submissionsTree)) {
                // create an entry for the learner if they don't exist
                clg(`creating entry for learner ${learnerId}`);
                submissionsTree[learnerId] = {};
            } else if (assignmentId in submissionsTree[learnerId]) {
                // check for this assignment already having been submitted
                let errorMsg = `Assignment has already been submitted for this learner (learner ${learnerId}, assignment ${assignmentId})`
                clg(errorMsg);
                throw errorMsg;
            };
            clg("\nShow the whole submissionsTree: ");
            clg(submissionsTree);
            clg('Attempting to add a property to submissionsTree[learnerId]' + submissionsTree[learnerId]);
            submissionsTree[learnerId][assignmentId] = {
                dateDue: dueDate(assignmentId),
                dateSubmitted: submission.submission.submitted_at,
                scoreRaw: submission.submission.score,
                scoreMax: pointsPossible(assignmentId),
            };
            clg('Did it work? submissionsTree[learnerId]: ');
            clg(submissionsTree[learnerId]);
        };
        clg('\nDEBUG: exiting growSubmissionsTree');
        clg("\nFirst, reviewing hostages and residue:");
        clg(submissionsTree);
        return submissionsTree;
    };

    function pruneSubmissionsTree(cutoffDate, latenessPenalty) {
        for (let learner in submissionsTree) {
            clg('\n');
            clg(learner);
            clg(submissionsTree[learner]);
            for (let assignment in submissionsTree[learner]) {
                clg(assignment);
                clg(submissionsTree[learner][assignment]);
                // if (submissionsTree[learner][assignment].dateDue > cutoffDate) {
                //     delete submissionsTree[learner][assignment];
                // } else if (submissionsTree[learner][assignment].dateSubmitted > submissionsTree[learner][assignment].dateDue) {
                //     submissionsTree[learner][assignment].scoreAdjusted = latenessPenalty(submissionsTree[learner][assignment]);
                // };
            };
        };
    };

    function latenessPenalty(assignmentBranch) {
        // Just subtracting 10% of max.
        let penalty = 0.1;  // flat penalty off max
        // Minimum score per assignment is 0. Don't subtract more points than were earned.
        return max(0, assignmentBranch.scoreRaw - (assignmentBranch.scoreMax * penalty));
    }

    
    submissionsTree = growSubmissionsTree();
    submissionsTree = pruneSubmissionsTree(CutoffDate, latenessPenalty);

    clg(submissionsTree);
    
    
    let result = [];
    result = [
        {
            id: 1234,
            avg: 1,
            1: 1,
            2: 1,
        },
    ];

    clg('\nfinal answer:');
    clg(submissionsTree);

    return submissionsTree;
};  // end getLearnerData

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
