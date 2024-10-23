function addSpaces(spaceCount) {
    let spaces = "";
    while (spaceCount > 0) {
        spaces += " ";
        spaceCount--;
    }
    return spaces;
}

function addStars(starCount) {
    let stars = "";
    while (starCount > 0) {
        stars += "*";
        starCount--;
    }
    return stars;
}

function leftTriangle(rows) {
    let currentRow = 1;
    while (currentRow <= rows) {
        console.log(addStars(currentRow));
        currentRow++;
    }
}

leftTriangle(5);
console.log();

function leftInvertTriangle(rows) {
    let currentRow = rows;
    while (currentRow >= 1) {
        console.log(addStars(currentRow));
        currentRow--;
    }
}

leftInvertTriangle(5);
console.log();

function rightTriangle(rows) {
    let currentRow = 1;
    while (currentRow <= rows) {
        let spaces = addSpaces(rows - currentRow);
        let stars = addStars(currentRow);
        console.log(spaces + stars);
        currentRow++;
    }
}

rightTriangle(5);
console.log();

function rightInvertTriangle(rows) {
    let currentRow = rows;
    while (currentRow >= 1) {
        let spaces = addSpaces(rows - currentRow);
        let stars = addStars(currentRow);
        console.log(spaces + stars);
        currentRow--;
    }
}

rightInvertTriangle(5);
console.log();

function doubleSideTriangle(rows) {
    let currentRow = 1;
    while (currentRow <= rows) {
        let spaces = addSpaces(rows - currentRow);
        let stars = addStars(2 * currentRow - 1);
        console.log(spaces + stars);
        currentRow++;
    }
}

doubleSideTriangle(5);
console.log();

function doubleSideInvertTriangle(rows) {
    let currentRow = rows;
    while (currentRow >= 1) {
        let spaces = addSpaces(rows - currentRow);
        let stars = addStars(2 * currentRow - 1);
        console.log(spaces + stars);
        currentRow--;
    }
}

doubleSideInvertTriangle(5);