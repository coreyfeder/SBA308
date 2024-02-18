

// Discount assignments not due before this time.
// _Of course_ we're only using ISO-8601. We're not _animals_.
const cutoffDate = new Date().toISOString().substring(0,10);  // yield 'YYYY-MM-DD'

function getLearnerData(
    courseGroup,        // ONE CourseInfo object
    assignmentGroup,    // ONE AssignmentGroup (which includes an ARRAY of AssignmentInfo)
    submissions,        // ARRAY of LearnerSubmission
) {
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
        Build:
     */
    
    let result;
    
    //  get a list of unique learnerIds
    let learnerIds = new Set();
    for (let sub of submissions) {
        learnerIds.add(Number(sub.learner_id));
    }
    console.log( "Learners:" + learnerIds );

    // TODO: 
    let mapAssignmentsToMaxPts = {}
    assignmentGroup.forEach(assignment => {
        if (assignment.due_at <= cutoffDate)
            mapAssignmentsToMaxPts[assignment.id] = assignment.points_possible;
    });

    result = [
        {
            "id": learnerId,
            "avg": learnerWeightedAvg,
            ...[assignment_id: assignment_score]
        } for each learnerId
    ]
    return result;
}



/* ------------------------------- */
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

let result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
console.log(result);
  
