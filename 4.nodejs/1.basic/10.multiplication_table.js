// 1
function gugudan() {
    for (let i = 2; i <= 9; i++) {
        console.log(`\n=== ${i}단 ===`)
        for (let j = 1; j <= 9; j++) {
            console.log(`${i} x ${j} = ${i*j}`);
        }
    }
}

gugudan();

function gugudan_n(dan) {
        console.log(`\n=== ${dan}단 ===`)
        for (let j = 1; j <= 9; j++) {
            console.log(`${dan} x ${j} = ${dan*j}`);
        }
}

gugudan_n(5);
    
// 2
// const numbuers = [1,2,3,4,5,6,7,8,9];

// numbuers.forEach((nums) => {
//     console.log(`=== ${nums}단 ===`);
//     for (let i = 1; i <= numbuers.length; i++) {
//         console.log(`${nums} x ${i} = ${nums * i}`);
//     }
// })