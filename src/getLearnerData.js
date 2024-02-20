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


/* 
brainstorming
    algorithm
        * Put all the data into its context.
            -> Put everything into one big tree, from Course down through Assignments.
                No, wait: this function is only receiving a single course and a single assignment group.
        * Go `result`-first
            1. list the students
            2. for each student:
                - get the countable assignments for the student
                - calculate the weighted average
    validation/error handling
        * centralize validation, or check only when data is used?
        * continue through easily-recoverable issues (eg, numbers passed as strings)?
        * continue through patially-recoverable issues (eg, a due date not being a parsable date)?
*/

/*
    Validate while building:
    1. assignmentGroup.course_id == course.id
    2. submissions[n].assignemt_id matches an assignemtneGroup.assignments.id
    Build:
    1.  {};
    2.  {
            {learnerId}: {
                "id": {learnerId},
                "avg": 0,
                "assignments": [],
            },
            ...
        }
    3.  {
            {learnerId}: {
                "id": {learnerId},
                "avg": 0,
                "assignments": [
                    {
                        "assignment_id": {assignment_id}
                    },
                ],
            },
            ...
        }


    2.  [{
            "id": {learnerId},

            learnerId2: {},
            ...
            learnerIdN: {},
        }];
    3.  {
            learnerId1: {

            },
            ...
        };

*/


// REMOVE BEFORE SUBMISSION
function clg(...args) { console.log(...args); };



// Discount assignments not due before this time.
// _Of course_ we're only using ISO-8601. We're not _animals_.
const CutoffDate = new Date().toISOString().substring(0,10);  // yield 'YYYY-MM-DD'


function getLearnerData(
    CourseInfo,             // ONE CourseInfo object
    AssignmentGroup,        // ONE AssignmentGroup (which includes an ARRAY of AssignmentInfo)
    LearnerSubmissions,     // ARRAY of LearnerSubmission
) {
    clg('\nBEGIN');
    // 1. Validate inputs, to some extent

    // 2. build map to general course info
    const AssignmentMap = mapAssignmentInfo(AssignmentGroup);
    clg('\nAssignmentGroup');
    clg(AssignmentGroup);
    clg('\nAssignmentMap');
    clg(AssignmentMap);
    
    // 3. build submission tree. or maybe just "bush".
    // AssigmentMap now points to elements of AssignmentGroup.
    // What happens when I pass AssigmentMap but not AssignmentGroup?
    const RearrangedSubmissions = arrangeSubmissions(LearnerSubmissions, AssignmentMap);
    clg('\nRearrangedSubmissions');
    clg(RearrangedSubmissions);

    let result = [];
    return result;
}


function validateTest(
    course,
    assignmentGroup,
    submissions,
) {
    return;
}


function validateRequestPayload(
    course,
    assignmentGroup,
    submissions,
) {
    // Perform basic validation on the incoming data.
    // TODO: sanitize inputs
    // TODO: verify incoming data against schema with an actual verification product
    let errors = [];
    try {
        // Do the inputs seem vaguely correct? Not missing, not blank?
        if ((!course) 
            || (typeof course != 'object')
            || !(Object.keys(course) > 0)
            ) errors.push("CourseInfo");
        if ((!assignmentGroup)
            || (typeof assignmentGroup != 'object')
            || !(Object.keys(assignmentGroup) > 0)
            ) errors.push("AssignmentGroup");
        if ((!submissions)
            || (!Array.isArray(submissions)) 
            || !(submissions.length > 0)
            ) errors.push("LearnerSubmissions");
        if (errors.length > 0) throw "Required input is missing or in the wrong format: " + errors.join(', ');

        // Do the CourseInfo and AssignmentGroup match?
        if (course.id != assignmentGroup.course_id) throw "Thw assignment group does not belong to the course specified.";

        // Are the dates date-y?
        for (let assignment of AssignmentGroup.assignments) {
            if (isNaN(Date.parse(assignment.due_at))) {
                throw `Assignment has invalid date: ${assignment.due_at}`;
            } else if (!(typeof assignment.id == 'number')) {
                throw `Assignment has invalid ID: ${assignment.id}`;
            // } else if (assignment.due_at > CutoffDate) {
                // continue;
            } else {
                // assignmentMap[assignment.id] = {
                    // due_at: assignment.due_at
            };
        };
    } catch (err) {
        // Should I re-throw this to make it explode? Or by "graceful" do they mean "yell but don't crash"?
        throw ('Error in request data: ' + err);
    };
};



function mapAssignmentInfo(AssignmentGroup) {
    // Make a lookup table to make finding assignment info easier
    let assignmentMap = {};
    for (let assignment of AssignmentGroup.assignments) {
        clg('inside mapAssignmentInfo');
        clg('  Current assignmentMap');
        clg(assignmentMap);
        assignmentMap[assignment.id] = assignment;
    };
    return assignmentMap;
};

function arrangeSubmissions(LearnerSubmissions, assignmentMap) {
    // Return relevant student assignments, organized by student
    let arrangedSubmissions = {};
    for (let submission of LearnerSubmissions) {
        clg('analyzing a submission:');
        clg(arrangedSubmissions);
        if (isAssignmentValid(submission, assignmentMap)) {
            // clg('\nInside arrangeSubmissions');
            // clg('arrangedSubmissions thus far:');
            // clg('submission: ');
            // clg(submission);
            // clg('submission.assignemt_id');
            // clg(submission.assignemt_id);
            // clg('assignmentMap: ');
            // clg(assignmentMap);
            // clg(assignmentMap[submission.assignemt_id]);
            // arrangedSubmissions[submission.learner_id] = {
                // 'assignment_id': submission.assignemt_id,
                // 'points_scored': adjustScoreForLateness(
                //     assignmentMap[submission.assignemt_id].due_at,
                //     submission.submission.submitted_at, 
                //     submission.submission.score,
                //     assignmentMap[submission.assignemt_id].points_possible,
                // ),
                // 'points_possible': assignmentMap[submission.assignemt_id].points_possible,
            };
        };
    };
};

// WIP
function isAssignmentValid(submission, assignmentMap) {
    // if (assignmentMap[submission.id]
    return true;
};

// WIP
function adjustScoreForLateness(dueDate, submissionDate, rawScore, maxScore) {
    return rawScore;
};


/* ------------------------|------------------------|------------------------ */
// Test Data

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
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

// The provided learner submission data.
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

console.log('Executing.');
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
