import axios from 'axios';

const baseURL = 'http://localhost:3000/users';

async function runTests() {
    try {
        console.log("=== 사용자 추가 테스팅 ===");
        const createUser1 = await axios.post(baseURL, { 
            name: "Alice", 
            email: "alice@example.com" 
        });
        console.log("사용자1 생성 완료: ", createUser1.data);
    
        const createUser2 = await axios.post(baseURL, {
            name: "Bob",
            email: "bob@example.com"
        });
        console.log("사용자2 생성 완료: ", createUser2.data);
    
        console.log("\n=== 사용자 목록 조회 테스팅 ===");
        const listUsers = await axios.get(baseURL);
        console.log("사용자 목록 조회: ", listUsers.data);
    
        console.log("\n=== 사용자 삭제 테스팅 ===");
        const deleteUser1 = await axios.delete(`${baseURL}/${createUser1.data.id}`);
        console.log("사용자1 삭제 완료");
    
        const deleteUser2 = await axios.delete(`${baseURL}/${createUser2.data.id}`);
        console.log("사용자2 삭제 완료");
    
        console.log("\n=== 사용자 목록 조회 테스팅 ===");
        const listUsers2 = await axios.get(baseURL);
        console.log("사용자 목록 조회: ", listUsers2.data);
    } catch (error: any) {
        console.error("에러 발생: ", error.message);
    }
}

runTests();