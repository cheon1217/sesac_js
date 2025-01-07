const ctx = document.getElementById('snake').getContext('2d');

const socket = new WebSocket(`ws://${window.location.host}/`);

socket.onopen = () => {
    console.log('서버와 연결됨');
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(`서버 메시지: ${data}`);
    const direction = data;
    console.log(`서버 메시지 처리: ${direction}`);

    switch (direction) {
        case 'up':
            snake[0].y = snake[0].y - 1;
            break;
        case 'down':
            snake[0].y = snake[0].y + 1;
            break;
        case 'left':
            snake[0].x = snake[0].x - 1;
            break;
        case 'right':
            snake[0].x = snake[0].x + 1;
            break;            
    }
}

socket.onclose = () => {    
    console.log('서버와 연결 종료됨');
}

socket.onerror = (error) => {
    console.error(`에러 발생: ${error}`);
}

// 시작시 초기값
const blockSize = 20;
let direction = 'right'; // 뱀 초기 이동 방향
const snakeSpeed = 200;
const canvasSize = 400;
const boardSize = canvasSize / blockSize;

// 가변 변수들
let snake = [
    {x: 0, y: 0}, // 초기 뱀의 위치
    // 뱀이 길어질때 이 배열에 몸통 추가...
];

let food = generateFood(); // 시작할때 랜덤 위치에 음식 생성
// TODO: 배열에 음식 여러개 생성하기


// 함수들
function playGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    drawSnake(); // 뱀 그리기
    
    drawFood();  // 사과 그리기

    checkEat(); // 먹었냐??

    moveSnake(); // 이동 제어
}

function checkEat() {
    // if snake 가 food 와 같은 위치냐??
    if (snake[0].x === food.x && snake[0].y === food.y) {
        console.log('냠냠');
        food = generateFood();
    }

    // TODO: Score 처리, 먹었으면 점수 올리기
    // TODO: Snake 길이 증가시키기
    // TODO: 음식이 뱀 몸에 생겼으면?? 어떻게??
}

function generateFood() {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);

    return { x, y };
}

function drawSnake() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(snake[0].x * blockSize, snake[0].y * blockSize, blockSize, blockSize);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

function moveSnake() {
    // switch (direction) {
    //     case 'up':
    //         snake[0].y = snake[0].y - 1;
    //         break;
    //     case 'down':
    //         snake[0].y = snake[0].y + 1;
    //         break;
    //     case 'left':
    //         snake[0].x = snake[0].x - 1;
    //         break;
    //     case 'right':
    //         snake[0].x = snake[0].x + 1;
    //         break;            
    // }

    // TODO: 화면을 벗어나면 반대쪽 화면에서 튀어나오게 하기.. 왼쪽끝<=>오른끝, 위<=>아래끝
    if (snake[0].x > boardSize - 1) {
        console.log('오른쪽끝');
        snake[0].x = boardSize - 1;
    } else if (snake[0].x < 0) {
        console.log('왼쪽끝');
        snake[0].x = 0;
    } else if (snake[0].y > boardSize - 1) {
        console.log('아래끝');
        snake[0].y = boardSize - 1;
    } else if (snake[0].y < 0) {
        console.log('위끝');
        snake[0].y = 0;
    }

    // TODO: 화면을 벗어나면 게임오버 글자출력
}

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right'
            break;
        // TODO: 위 내용을 좀 더 줄일수 없을까??
    }
})

// 게임 시작 - 반복 호출...
setInterval(playGame, snakeSpeed);