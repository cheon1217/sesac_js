function leftTriangle() {
    let rows = 5;
    let currentRow = 1;
    while (currentRow <= rows) {
        // 매줄 카운팅은 성공했고
        // 매번 별의 갯수를 늘린다
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*";
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}

leftTriangle();
console.log();

function leftInvertTriangle() {
    let rows = 5;
    let currentRow = rows;
    while (currentRow >= 1) {
        // 매줄 카운팅은 성공했고
        // 매번 별의 갯수를 늘린다
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*";
            starCount++;
        }
        console.log(stars);
        currentRow--;
    }
}

leftInvertTriangle();
console.log();

function rightTriangle() {
    let rows = 5;
    let currentRow = 1;
    while (currentRow <= rows) {
        let spaces = "";
        let stars = "";

        let spaceCount = 1;
        while (spaceCount <= rows - currentRow) {
            spaces += " ";
            spaceCount++;
        }

        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*";
            starCount++;
        }

        console.log(spaces + stars);
        currentRow++;
    }
}

rightTriangle();
console.log();

function rightInvertTriangle() {
    let rows = 5;
    let currentRow = rows;
    while (currentRow >= 1) {
        let spaces = "";
        let stars = "";

        let spaceCount = 1;
        while (spaceCount <= rows - currentRow) {
            spaces += " ";
            spaceCount++;
        }

        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*";
            starCount++;
        }

        console.log(spaces + stars);
        currentRow--;
    }
}

rightInvertTriangle();
console.log();

function doubleSideTriangle() {
    let rows = 5;
    let currentRow = 1;
    while (currentRow <= rows) {
        let spaces = "";
        let stars = "";

        let spaceCount = 1;
        while (spaceCount <= rows - currentRow) {
            spaces += " ";
            spaceCount++;
        }

        let starCount = 1;
        while (starCount <= 2 * currentRow - 1) {
            stars += "*";
            starCount++;
        }

        console.log(spaces + stars);
        currentRow++;
    }
}

doubleSideTriangle();
console.log();

function doubleSideInvertTriangle() {
    let rows = 5;
    let currentRow = rows;
    while (currentRow >= 1) {
        let spaces = "";
        let stars = "";

        let spaceCount = 1;
        while (spaceCount <= rows - currentRow) {
            spaces += " ";
            spaceCount++;
        }

        let starCount = 1;
        while (starCount <= 2 * currentRow - 1) {
            stars += "*";
            starCount++;
        }

        console.log(spaces + stars);
        currentRow--;
    }
}

doubleSideInvertTriangle();