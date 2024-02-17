// Discount assignments not due before this time.
// _Of course_ we're only using ISO-8601. We're not _animals_.
const cutoffDate = new Date().toISOString().substring(0,10);

function getLearnerData(
    course,         // CourseInfo
    assignments,    // AssignmentGroup (which includes array of AssignmentInfo)
    submissions,    // array of LearnerSubmission
) {
    let result;
    let learners, assignmentIds,
    result = [
        {
            "id": learnerId,
            "avg": learnerWeightedAvg,
            ...learnerAssignments
        } for each learnerId;
    ]
    return result;
}
