# Guessing Game Flowchart

```mermaid
flowchart TD
    Start([Start]) --> Init[Generate Random Number]
    Init --> Input[User Inputs Guess]
    Input --> CheckRange{Is Guess in Range?}
    CheckRange -- No --> Invalid[Show Invalid Input]
    Invalid --> Input
    CheckRange -- Yes --> Compare{Is Guess Correct?}
    Compare -- Too Low --> FeedbackLow[Show Too Low]
    FeedbackLow --> Input
    Compare -- Too High --> FeedbackHigh[Show Too High]
    FeedbackHigh --> Input
    Compare -- Correct --> Correct[Show Correct!]
    Correct --> End([End])
