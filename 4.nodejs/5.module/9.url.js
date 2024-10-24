const { hostname } = require("node:os");
const url = require("node:url");

const myURL = "https://www.example.com/api/path?query=value";
// 원시타입(primitive type), string 문자열 타입.

// URL 파싱
// 1. 호스트명 출력하기
console.log(myURL.hostname);
console.log(typeof myURL)

const myURLObj = new URL(myURL);
console.log(typeof myURLObj);
console.log(myURLObj instanceof URL);

console.log(myURLObj.hostname);

// 2. 경로 출력하기
console.log(myURLObj.pathname);

// 3. 쿼리 파라미터 출력하기
console.log(myURLObj.search);
console.log(myURLObj.searchParams)

// URL 파싱 #2
const parsedURL = url.parse(myURL);
console.log(parsedURL);
console.log(parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.hostname);
console.log(parsedURL.search);
console.log(parsedURL.query);

// 내가 경로를 조립해서 만들고 싶으면?
const myURL2 = {
    protocol: "https",
    hostname: "www.sesac.com",
    pathname: "myservice/mypath/dir1",
    query: {
        product: "hello"
    }
}

const assembledURL = url.format(myURL2);
console.log("내 주소는:", assembledURL);