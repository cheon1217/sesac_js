let j = 0;
while(j < 5) {
    console.log(`while구문: ${j}`);
    j++;
};

let k = 0;
do {
    console.log(`do-while구문: ${k}`);
    k++;
} while (k < 5);

for (let i = 0; i < 10; i++) {
    console.log(`for구문: ${i}`);
    if (i == 3) {
        break; // for/dowhile/while 어디던지 중간에 해당 블럭을 중단한다.
    }
}

for (let i = 0; i < 10; i++) {
    if (i == 3) {
        continue; // for/dowhile/while 어디던지 중간에 해당 블럭의 흐름을 건너뛴다.
    }
    console.log(`for구문: ${i}`);
}