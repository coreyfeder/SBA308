/* 
    Basic testing
    All test cases in this file.
*/

const functionToTest = getLearnerData;
if (typeof testCases == "undefined") {
    let testCases = {};
}

function runSingleTest(test) {
    // customize for program
    console.assert(functionToTest(...test.args), test.result, test.message);
}

function runTestBattery(tests) {
    for (let test in tests) {
        console.log(`running test: ${test}`);
        runSingleTest(...tests[test]);
        console.log(`test ${test} complete.\n`);
    }
}

/* -----------------|-----------------|----------------- */
// Test cases

testCases = {
    provided: {
        CourseInfo: {
            id: 451,
            name: "Introduction to JavaScript",
        },
        AssignmentGroup: {
            id: 12345,
            name: "Fundamentals of JavaScript",
            course_id: 451,
            group_weight: 25,
            assignments: [
                {
                    id: 1,
                    name: "Declare a Variable",
                    due_at: "2023-01-25",
                    points_possible: 50,
                },
                {
                    id: 2,
                    name: "Write a Function",
                    due_at: "2023-02-27",
                    points_possible: 150,
                },
                {
                    id: 3,
                    name: "Code the World",
                    due_at: "3156-11-15",
                    points_possible: 500,
                },
            ],
        },
        LearnerSubmissions: [
            {
                learner_id: 125,
                assignment_id: 1,
                submission: {
                    submitted_at: "2023-01-25",
                    score: 47,
                },
            },
            {
                learner_id: 125,
                assignment_id: 2,
                submission: {
                    submitted_at: "2023-02-12",
                    score: 150,
                },
            },
            {
                learner_id: 125,
                assignment_id: 3,
                submission: {
                    submitted_at: "2023-01-25",
                    score: 400,
                },
            },
            {
                learner_id: 132,
                assignment_id: 1,
                submission: {
                    submitted_at: "2023-01-24",
                    score: 39,
                },
            },
            {
                learner_id: 132,
                assignment_id: 2,
                submission: {
                    submitted_at: "2023-03-07",
                    score: 140,
                },
            },
        ],
        ExpectedResult: [
            {
                id: 125,
                avg: 0.985, // (47 + 150) / (50 + 150)
                1: 0.94, // 47 / 50
                2: 1.0, // 150 / 150
            },
            {
                id: 132,
                avg: 0.82, // (39 + 125) / (50 + 150)
                1: 0.78, // 39 / 50
                2: 0.833, // late: (140 - 15) / 150
            },
        ],
    },
};

runTestBattery(testCases);
