const canvas = document.getElementById("tetrisCanvas");
const ctx = canvas.getContext("2d");

// 블록 크기
const blockSize = 30;

// 게임 보드의 행과 열 수를 정의합니다.
const rows = 20;
const cols = 10;

// 게임 보드를 나타내는 배열을 생성하고 초기값을 0으로 채웁니다.
const gameBoard = Array.from({ length: rows }, () => Array(cols).fill(0));

// 다양한 테트리스 블록의 모양을 정의한 배열
const tetrisBlocks = [
    [[1, 1, 1, 1,]],
    [[1, 1, ,1], [1]],
    [[1, 1, 1], [0, 1]],
    [[1, 1, 1], [1, 0]],
    [[1, 1], [1, 1]],
    [[1, 1, 1], [0, 0, 1]],
    [[1, 1, 1], [1, 0, 0]],
];

let currentBlock;
let currentX;
let currentY;
let gameOverFlag = false;

// 현재 게임 상태를 화면에 그리기
function drawBlock(x, y, block) {
    for (let i = 0; i < block.length; i++) {
        for (let j = 0; j < block[i].length; j++) {
            if (block[i][j]) {
                // 블록이 있는 위치를 색으로 채우고 테두리를 그립니다.
                ctx.fillStyle = "#0095DD";
                ctx.fillRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
                ctx.strokeStyle = "#003366";
                ctx.strokeRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
            }
        }
    }
}

// 현재 게임 상태 그리기
function draw() {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 게임 보드 그리기
    drawGameBoard();

    // 현재 블록이 없다면 새로운 블록 생성
    if (!currentBlock) {
        spawnBlock();
    }

    // 현재 블록
    drawBlock(currentX, currentY, currentBlock);
}

// 새로운 블록을 생성
function spawnBlock() {
    // 게임 종료 상태이면 함수 종료
    if (gameOverFlag) {
        return;
    }

    // 랜덤한 인덱스로부터 테트리스 블록을 선택하여 현재 블록으로 설정
    const randomIndex = Math.floor(Math.random() * tetrisBlocks.length);
    currentBlock = tetrisBlocks[randomIndex];

    // 블록의 시작 위치
    currentX = Math.floor((cols - currentBlock[0].length) / 2);
    currentY = 0;

    // 충돌이 발생하면 게임 오버
    if (collision()) {
        gameOver();
    }
}

// 게임 오버 상태로 설정하고 콘솔에 메시지 출력
function gameOver() {
    gameOverFlag = true;
    console.log("Game Over");
}

// 키보드 입력 처리
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    // 게임 오버 상태
    if (gameOverFlag) {
        return;
    }

    // 키 입력에 따라 블록을 이동하거나 회전
    if (e.key === "ArrowDown") {
        moveBlockDownSelf();
    } else if (e.key === "ArrowLeft") {
        moveBlockLeft();
    } else if (e.key === "ArrowRight") {
        moveBlockRight();
    } else if (e.key === "ArrowUp") {
        rotateBlock();
    }

    // 게임 상태를 업데이트 후 화면 그리기
    draw();
}

// 블록을 아래로 이동
function moveBlockDown() {
    // 한칸 아래로 이동
    currentY += 1;

    // 충돌 발생하면 블록을 한 칸 위로 옮겨서 병합하고 가득찬 줄을 체크한 후 새로운 블록을 생성
    if (collision()) {
        currentY -= 1;
        mergeBlock();
        checkFullLines();
        spawnBlock();
    }
}

// 블록을 화면 아래까지 이동시키는 함수
function moveBlockDownSelf() {
    // 블록이 화면 아래까지 이동할 수 있을 때까지 이동
    while(!collision()) {
        currentY += 1;
    }

    // 블록을 마지막으로 그린 위치로 되돌리고 병합하고 가득 찬 줄을 체크한 후 새로운 블록 생성
    currentY -= 1;
    mergeBlock();
    checkFullLines();
    spawnBlock();
}

// 블록을 왼쪽으로 이동
function moveBlockLeft() {
    // 한칸 왼쪽으로 이동
    currentX -= 1;

    // 충돌이 발생하면 블록을 한칸 오른쪽으로 옮깁니다.
    if (collision()) {
        currentX += 1;
    }
}

// 블록을 오른쪽으로 이동
function moveBlockRight() {
    // 한칸 오른쪽으로 이동
    currentX += 1;

    // 충돌 발생하면 블록을 한칸 왼쪽으로 옮김
    if (collision()) {
        currentX -= 1;
    }
}

// 블록을 시계 방향으로 회전
function rotateBlock() {
    // 현재 블록을 회전시킨 후 충돌이 발생하면 다시 이전 상태로 되돌립니다.
    const originalBlock = currentBlock;
    currentBlock = rotateClockwise(currentBlock);
    if (collision()) {
        currentBlock = originalBlock;
    }
}

// 블록을 시계 방향으로 90도 회전시키는 함수
function rotateClockwise(block) {
    const rotatedBlock = [];
    const rows = block.length;
    const cols = block[0].length;

    // 시계 방햐으로 90도 회전한 새로운 블록을 생성
    for (let i = 0; i < cols; i++) {
        rotatedBlock[i] = [];
        for (let j = rows - 1; j >= 0; j--) {
            rotatedBlock[i][rows - 1 - j] = block[j][i];
        }
    }

    return rotatedBlock;
}

// 블록을 반시계 방향으로 90도 회전시키는 함수
function rotateCounterClockwise(block) {
    const rotatedBlock = [];
    const rows = block.length;
    const cols = block[0].length;

    // 반시계 방햐으로 90도 회전한 새로운 블록을 생성
    for (let i = 0; i < cols; i++) {
        rotatedBlock[i] = [];
        for (let j = 0; j < rows; j++) {
            rotatedBlock[i][j] = block[rows - 1 - j][i];
        }
    }

    return rotatedBlock;
}

// 블록이 충돌하는지 확인하는 함수
function collision() {
    for (let i = 0; i < currentBlock.length; i++) {
        for (let j = 0; j < currentBlock[i].length; j++) {
            if (currentBlock[i][j] && (currentX + j < 0 || currentX + j >= cols || currentY + i >= rows || gameBoard[currentY + i][currentX + j])) {
                return true;
            }
        }
    }
    
    // 충돌이 없으면
    return false;
}

// 블록을 게임 보드에 병합하는 함수
function mergeBlock() {
    for (let i = 0; i < currentBlock.length; i++) {
        for (let j = 0; j < currentBlock[i].length; j++) {
            if (currentBlock[i][j]) {
                // 블록이 있는 위치를 게임 보드에 1로 설정하여 병합
                gameBoard[currentY + i][currentX + j] = 1;
            }
        }
    }
}

// 게임 보드를 화면에 그리기
function drawGameBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (gameBoard[i][j]) {
                // 게임 보드의 각 셀에 블록이 있는 경우를 색으로 채우고 테두리를 그립니다.
                ctx.fillStyle = "#0095DD";
                ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
                ctx.strokeStyle = "#003366";
                ctx.strokeRect(j * blockSize, i * blockSize, blockSize, blockSize);
            }
        }
    }
}

// 가득찬 줄을 확인하고 제거
function checkFullLines() {
    let linesToRemove = [];

    for (let i = rows - 1; i >= 0; i--) {
        if (gameBoard[i].every(cell => cell)) {
            // 해당 줄이 모두 차 있으면 제거할 줄 목록에 추가
            linesToRemove.push(i);
        }
    }

    // 제거할 줄이 있다면 차례대로 제거
    if (linesToRemove.length > 0) {
        console.log(linesToRemove);
        removeLines(linesToRemove);
    }
}

// 특정 줄들을 제거하고 윗 줄을 한 칸씩 내리는 함수
async function removeLines(linesToRemove) {
    const delay = 200; // 각 호출 간의 지연 시간 (ms)
    
    // 각 줄에 대해 차례대로 처리
    for (let i = 0; i < linesToRemove.length; i++) {
        console.log("Deleting line", linesToRemove[i]);
        // 해당 줄을 삭제 (먼저 지운 줄로 인해 다음 줄은 1칸씩 아래로 밀림)
        gameBoard.splice(linesToRemove[i] + i, 1);

        // 맨 위에 빈 줄을 추가합니다.
        gameBoard.unshift(Array(cols).fill(0));

        // 화면 그리기
        draw();

        // 일정 시간을 기다립니다
        await wait(delay);
    }
}

// 주어진 시간(ms) 동안 코드이 실행을 중단시키는 동기 함수
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 초당 프레임 수 정의
const framesPerSecond = 1;

// 게임 상태를 업데이트하는 함수
function update() {
    draw();
    moveBlockDown();

    // 일정 시간 간격으로 업데이트 반복
    if (!gameOverFlag) {
        setTimeout(update, 1000 / framesPerSecond);
    }
}

// 초기 게임 업데이트를 시작
update();