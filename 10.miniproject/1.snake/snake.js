const ctx = document.getElementById("snake").getContext("2d");

// 시작시 초기값
const blockSize = 20;
let direction = "right"; // 뱀 초기 이동 방향
const snakeSpeed = Math.floor(Math.random() * 500);
const canvasSize = 400;
const boardSize = canvasSize / blockSize;

// 가변 변수들
let snake = [
    {x: 0, y: 0}, // 초기 뱀의 위치
    // 뱀이 길어질 때 이 배열에 몸통 추가..
];

let food = generateFood(); // 시작할 때 랜덤 위치에 음식 생성
// TODO: 배열에 음식 여러개 생성하기 

let gameover = false;
let lastkeyPressTime = 0;

// 함수들
function playGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    if (gameover) {
        ctx.fillStyle = "red";
        ctx.font = "30px Santos";
        ctx.fillText("Game Over", 80, canvasSize / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Retry? (Press Y)", 80, canvasSize / 2 + 40);
        return;
    }

    drawSnake(); // 뱀 그리기
    
    drawFood(); // 사과 그리기

    moveSnake(); // 이동 제어
    checkCollision(); // 충돌 감지
    checkFood();
}

function checkCollision() {
    if (gameover) {
        return;
    }

    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize / blockSize || head.y < 0 || head.y >= canvasSize / blockSize || isFoodOnSnake()) {
        gameover = true;
    }
}

function isSnakeCollision() {
    const head = snake[0];
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function checkFood() {
    // snake와 food가 같은 위치인가??
    if (snake[0].x === food.x && snake[0].y === food.y) {
        console.log("냠냠");
        food = generateFood();

        // TODO: Score 처리, 먹었으면 점수 올리기
        // TODO: Snake 길이 증가시키기
        // TODO: 음식이 뱀 몸에 생겼으면?? 어떻게??
    } else {
        snake.pop();
    }
}

function generateFood() {
    let foodPosition;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
        };
    } while (isFoodOnSnake(foodPosition));  

    return foodPosition;
}

function isFoodOnSnake(foodPosition) {
    return snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y);
}

function drawSnake() {
    ctx.fillStyle = "blue";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case "up":
            head.y = head.y - 1;
            break;
        case "down":
            head.y = head.y + 1;
            break;
        case "left":
            head.x = head.x - 1;
            break;
        case "right":
            head.x = head.x + 1;
            break;
        }
        snake.unshift(head);
        
    // TODO: 화면을 벗어나면 반대쪽 화면에서 튀어나오게 하기.. 왼쪽 끝<=>오른쪽 끝, 위 <=> 아래 끝
    // if (snake[0].x > boardSize) {
    //     console.log("오른쪽 끝");
    //     snake[0].x = 0;
    // } else if (snake[0].x < 0) {
    //     console.log("왼쪽 끝");
    //     snake[0].x = boardSize;
    // } else if (snake[0].y > boardSize) {
    //     console.log("아래끝");
    //     snake[0].y = 0;
    // } else if (snake[0].y < 0) {
    //     console.log("위끝");
    //     snake[0].y = boardSize;
    // }
}

function resetGame() {
    snake = [{ x: 0, y: 0 }];
    direction = "right";
    food = generateFood();
    gameover = false;
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    if (gameover) {
        if (e.key.toLowerCase() === "y") {
            resetGame();
        }
        return;
    }

    const now = Date.now();
    const timeSinceLastKeyPress = now - lastkeyPressTime;

    if (timeSinceLastKeyPress < snakeSpeed) {
        console.log("ignore key press");
        return;
    }

    console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }

    lastkeyPressTime = now;
}

// 게임 시작 - 반복 호출
setInterval(playGame, snakeSpeed);