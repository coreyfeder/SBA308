# Usage Notes

This function does not assume any completeness in or beyond the data provided. To wit:

-   This function allows for extra credit assignments and for extra credit on regular assignments.
    -   To represent an optional assignment, set the assignment's `points_possible` to zero.
    -   To represent an ad-hoc extra credit assignment or award, you may use the above method, or you can use an assignment ID that does not appear in the Assignment Group. _Do not leave any assignment ID blank!_
    -   A learner's score may be greater than an assignment's `points_possible`. If you award the extra points, they will be counted.
-   Lateness penalties will not bring an assignment's score below zero.
