# Per Scholas—SBA 308—JavaScript Fundamentals
https://perscholas.instructure.com/courses/1923/assignments/355959
https://www.canva.com/design/DAFxJzEGlWs/OxnBpoTDbneAidu7eN9WLw/view

## Objectives

* Employ basic JavaScript syntax accurately.
* Implement control flow structures such as conditionals and loops effectively.
* Use arrays and objects to organize and manage data.
* Develop functions to create reusable code.
* Utilize loops and iteration to navigate through data collections.
* Implement error handling to manage potential code failures gracefully.

## Instructions

Create a script that receives the results of various assignments for a course, then outputs a performance summary for each student.

## Schema

### Input

#### Input function `getLearnerData`

| field | type | description |
| ----- | ---- | ----------- |
| `course` | `CourseInfo` object | information about course to which the assignments belong |
| `assignmentGroup` | `AssignmentGroup` object | information about a group of assignments |
| `submissions` | array of `LearnerSubmission` objects | completed student assignments |

#### `CourseInfo` object

| field | think of it as | type | required | description |
| ----- | -------------- | ---- | -------- | ----------- |
| `id` | `course_id` | number | false | course ID |
| `name` | `course_name` | string | false | course name |

#### `AssignmentGroup` object

| field | think of it as | type | required | description |
| ----- | -------------- | ---- | -------- | ----------- |
| `id`   | `assignment_group_id` | number |  | Assignment group ID |
| `name` | `assignment_group_name` | string | false | Assignment group name |
| `course_id` |  | number | false | the ID of the course to which the assignment group belongs<br />_Must match CourseInfo provided._ |
| `group_weight` |  | number | false | the percentage weight of the entire assignment group<br />_*Not used._ |
| `assignments` |  | array of `AssignmentInfo` | true |  |

##### `AssignmentInfo` object

| field | think of it as | type | required | description |
| ----- | -------------- | ---- | -------- | ----------- |
| `id`   | `assignment_id` | number | Assignment ID |
| `name` | `assignment_name` | string | Assignment name |
| `due_at` |  | Date string | The due date for the assignment |
| `points_possible` |  | number | The maximum points possible for the assignment<br />Enter `0` for extra-credit assignments. |

#### `LearnerSubmission` object

| field | type | description |
| ----- | ---- | ----------- |
| `learner_id`   | number | learner ID |
| `assignment_id` | number | assignment ID |
| `submission` | (object) | the learner's submission of this assignment |
| `submission.submitted_at` | Date string | date of submission |
| `submission.score` | number | total number of points given |

### Output

Output an array of `LearnerCurrentStanding` objects:

| field | type | description |
| ----- | ---- | ----------- |
| `id` | number | the ID of the learner for which this data has been collected |
| `avg` | number | the learner’s total, weighted average.<br />Weigh all points equally, not all assignments (sum of actual scores / sum of possible score) |
| `assignment_id`* (number) | score (number) | This key-value pair will map an assignment key to the learner's score for that assignment.<br/>_Repeat this for each applicable assignment._ |

Weighting example: If a learner scores a 0 out of 10 on one assigment (0%) and 100 out of 100 on another assignment (100%), the weighted score should be (0+100)/(10+100) = 0.9091...; _not_ (0 + 100)/2 = 0.5.

## Processing Rules

* If an assignment is not yet due, do not include it in the results or the average.

* If the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

* Use try/catch and other logic to handle errors gracefully.
    * If an `AssignmentGroup` does not belong to its course (mismatching `course_id`), your program should throw an error, letting the user know that the input was invalid.
    * account for potential errors in the data that your program receives.
    * `points_possible` must not be 0
    * filter/sanitize incooming data for expected value and type.
    * if an assignment is not yet due, it should not be included in either the average or the keyed dictionary of scores

## Data Mapping

| output field | source | aggregation method |
| ------------ | ------ | ------------------ |
| `id` (`learnerId`) | table key | establishes table relationships |
| `avg` | (composite) | calculated from `Submission.score` and `AssigmentInfo.points_possible` |
| `assignment_id`* |  | key-value pair mapping assignment key to learner's score.<br/>_Repeat for each included assignment._ |

*Composite field `avg`:*
| element field | source | aggregation method |
| ------------- | ------ | ------------------ |
| `score` | `submissions` ([`LearnerSubmission`])<br /> > `submission` <br /> > `score` | group by `AssignmentGroup`<br />> sum by learner's `id` |
| `points_possible` | `assignmentGroup` (`AssigmentGroup`)<br /> > `assignments` ([AssignmentInfo])<br /> > `points_possible` | group by `AssignmentGroup`<br /> > group by [`AssignmentInfo`] |


## Future Improvements

* Accept more than one group of assignments in a single function call.
* Accept assignments of more than one course in a single function call.
* Allow more than one submission per assignment per learner.
* Allow selection of reconciliation methods (highest, latest, average, weighted average...).
* Allow selection of lateness penalization methods (reduction: none | flat | percent; increase: nonincreasing | linear | additive | multiplicative).
* Calculate class rankings or percentiles.
* Project range of possible final scores given assignments not yet due.
