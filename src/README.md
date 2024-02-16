# Per Scholas—SBA 308—JavaScript Fundamentals

## Objectives

* Employ basic JavaScript syntax accurately.
* Implement control flow structures such as conditionals and loops effectively.
* Use arrays and objects to organize and manage data.
* Develop functions to create reusable code.
* Utilize loops and iteration to navigate through data collections.
* Implement error handling to manage potential code failures gracefully.

## Instructions

Create a script that gathers data, processes it, and then outputs a consistent result as described by a specification.

## Schema

### Input

#### `getLearnerData`

```
getLearnerData(
    course:         CourseInfo, 
    assignments:    AssignmentGroup, 
    submissions:    array of LearnerSubmission,
)
```

#### Input function `getLearnerData`

| field  | type   | description |
|--------|--------|--|
| `course` | `CourseInfo` object |  |
| `assignments` | `AssignmentGroup` object |  |
| `submissions` | array of `LearnerSubmission` objects | completed student assignments |

#### `CourseInfo` object

| field  | type   | description |
|--------|--------|--|
| `id` | number | student ID |
| `name` | string | student name |

#### `AssignmentGroup` object

| field  | type   | description |
|--------|--------|--|
| `id`   | number | student ID |
| `name` | string | student name |
| `course_id` | number | the ID of the course the assignment group belongs to |
| `group_weight` | number | the percentage weight of the entire assignment group |
| `assignments` | array of `AssignmentInfo` |  |

#### `AssignmentInfo` object

| field  | type   | description |
|--------|--------|--|
| `id`   | number | student ID |
| `name` | string | student name |
| `due_at` | Date string | the due date for the assignment |
| `points_possible` | number | the maximum points possible for the assignment |

#### `LearnerSubmission` object

| field  | type   | description |
|--------|--------|--|
| `learner_id`   | number | student ID |
| `assignment_id` | number | student name |
| `submission` | Submission object | assignment's submission date and score |

#### `Submission` object

| field  | type   | description |
|--------|--------|--|
| `submitted_at` | Date string |  |
| `score` | number |  |



#### Outputs

```
{
    // the ID of the learner for which this data has been collected
    "id": number,

    // the learner’s total, weighted average, in which assignments
    // with more points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
    "avg": number,

    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
    <assignment_id>: number,
    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
    
}
```

### Processing Rules

* If an assignment is not yet due, do not include it in the results or the average.

* If the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

* Use try/catch and other logic to handle errors gracefully.
    * If an `AssignmentGroup` does not belong to its course (mismatching `course_id`), your program should throw an error, letting the user know that the input was invalid.
    * account for potential errors in the data that your program receives.
    * `points_possible` must not be 0
    * filter/sanitize incooming data for expected value and type.






### Interface & Implementation

Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.

***Input***

```
getLearnerData(
    CourseInfo, 
    AssignmentGroup, 
    [LearnerSubmission],
)
```

, and returns the formatted result, which should be an array of objects as described above.


