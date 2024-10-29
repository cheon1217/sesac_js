class Generator {
    getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomData(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

module.exports = Generator;