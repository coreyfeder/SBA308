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

const CutoffDate = new Date().toISOString().substring(0,10);  // yield 'YYYY-MM-DD'
    // Ignore assignments not due before this time.
    // _Of course_ we're only using ISO-8601. We're not _animals_.


/*-  Helpers  -*/

function clg(...args) { console.log(...args); };



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

/*-  Primary  -*/

function getLearnerData(
    CourseInfo,             // ONE CourseInfo object
    AssignmentGroup,        // ONE AssignmentGroup (which includes an ARRAY of AssignmentInfo)
    LearnerSubmissions,     // ARRAY of LearnerSubmission
) {
    let result = [
        {
            id: 1234,
            avg: 1,
            1: 1,
            2: 1,
        },
    ];
    return result;
};

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
