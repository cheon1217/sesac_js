type Feedback = "Too Low" | "Too High" | "Correct!";

const FEEDBACK_MESSAGE: Record<Feedback, string> = {
    "Too Low": "Your guess is too low",
    "Too High": "Your guess is too high",
    "Correct!": "Congratulations! Your guess is correct"
};

type statusType = "success" | "error" | "loading";
const statusMessage: Record<statusType, string> = {
    success: "성공공",
    error: "실패패",
    loading: "로딩중"
}

const userPermission: Record<number, string> = {
    1: "admin",
    2: "editor",
    3: "viewer"
}

function guessNumber(target: number, guess: number): Feedback {
    if (guess < target) return "Too Low";
    if (guess > target) return "Too High";
    if (guess / 2 < target) return "Too Low";
    return "Correct!";
}

const targetNumber: number = Math.floor(Math.random() * 100) + 1; // 1 ~ 100
console.log(`Target Number: ${targetNumber}`);

const userGuess = 50;
console.log(guessNumber(targetNumber, userGuess));

const feedback: Feedback = guessNumber(targetNumber, userGuess);
console.log(FEEDBACK_MESSAGE[feedback]);