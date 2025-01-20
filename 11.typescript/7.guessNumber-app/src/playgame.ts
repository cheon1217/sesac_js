import readlineSync from 'readline-sync';

class GuessNumberGame {
    private targetNumber: number;
    private attempts: number;
    private maxAttempts: number;

    constructor(maxAttempts: number = 10) {
        this.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.maxAttempts = maxAttempts;
    }

    private getFeedback(guess: number): string {
        if (guess < this.targetNumber) return "Too Low";
        if (guess > this.targetNumber) return "Too High";
        return "Correct!";
    }

    public play(): void {
        console.log(`Target Number: ${this.targetNumber}`);
        while (this.attempts < this.maxAttempts) {
            const userGuess = parseInt(readlineSync.question("Enter your guess: "));
            const feedback = this.getFeedback(userGuess);
            console.log(feedback);
            this.attempts++;
            if (feedback === "Correct!") {
                console.log(`Congratulations! Your guess is correct. ${this.attempts}/${this.maxAttempts} 번만에 맞췄습니다.`);
                return;
            }
        }
        console.log("You have reached the maximum number of attempts");
    }
}

const game = new GuessNumberGame();
game.play();