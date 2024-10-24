function asyncOperation1(response, callback) {
    setTimeout(() => {
        console.log("Operation1 completed");
        callback("Response1");
    }, 1000);
}

function asyncOperation2(response, callback) {
    setTimeout(() => {
        console.log("Operation2 completed", response);
        callback("Response2");
    }, 1000);
}

function asyncOperation3(response, callback) {
    setTimeout(() => {
        console.log("Operation3 completed", response);
        callback("Response3");
    }, 1000);
}

function asyncOperation4(response, callback) {
    setTimeout(() => {
        console.log("Operation4 completed", response);
        callback("Response4");
    }, 1000);
}

asyncOperation1(null, (response1) => {
    asyncOperation2(response1, (response2) => {
        asyncOperation3(response2, (response3) => {
            asyncOperation4(response3, (response4) => {
                console.log("Final Result:", response4);
            })
        })
    })
})

