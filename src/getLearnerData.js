// Discount assignments not due before this time.
// _Of course_ we're only using ISO-8601. We're not _animals_.
const cutoffDate = new Date().toISOString().substring(0,10);

function getLearnerData(
    courseGroup,        // CourseInfo
    assignmentGroup,    // AssignmentGroup (which includes array of AssignmentInfo)
    submissions,        // array of LearnerSubmission
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
    let result;
    
    //  get a list of unique learnerIds
    //  simple errors to fix on the fly: convert String to Number
    //      IF Number(string) == string
    //      and string != ''
    //  everything else, throw errors
    let learnerIds = new Set();
    for (let sub of submissions) {
        // TODO: error handling & try-catch
        learnerIds.add(Number(sub.learner_id));
    }

    // TODO: 
    let mapAssignmentsToMaxPts = {}
    assignmentGroup.forEach(assignment => {
        if (assignment.due_at <= cutoffDate)
            mapAssignmentsToMaxPts[assignment.id] = assignment.points_possible;
    })    

    result = [
        {
            "id": learnerId,
            "avg": learnerWeightedAvg,
            ...learnerAssignments
        } for each learnerId;
    ]
    return result;
}
