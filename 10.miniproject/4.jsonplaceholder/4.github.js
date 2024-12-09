const axios = require("axios");
require("dotenv").config();

const username = "cheon1217";
const url = `https://api.github.com/users/${username}/repos`;
const token = process.env.GITHUB_TOKEN;
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

// axios.get(url)
//     .then(response => {
//         console.log("내리포정보: ", response.data);
//     })

const fetchgithub = async () => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        if (response.status === 200) {
            // console.log("내 리포 정보: ", response.data);
            // 나의 리포 목록만 출력
            const repos = response.data;
            repos.forEach(repo => {
                console.log(`리포명: ${repo.name}, 스타수: ${repo.stargazers_count}`);
            })
            
            // 스타가 많은 리포순으로 소팅, 그 후 top 5만 뽑아내기
            const topStarredRepo = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
            console.log("=== 스타수가 많은 리포 top5 ===");
            topStarredRepo.forEach(repo => {
                console.log(`리포명: ${repo.name}, 스타수: ${repo.stargazers_count}`);
            })

            // 최근에 업데이트가 이루어진 리포들은??
            // 최근 한달 이내 업데이트가 이루어진 리포들을 출력하시오
            const recentlyUpdatedRepos = repos.filter(repo => {
                const updatedAt = new Date(repo.updated_at);
                return updatedAt >= oneMonthAgo;
            });

            console.log("한달 내 업데이트 된 리포");
            recentlyUpdatedRepos.forEach(repo => {
                // 한국 시간으로 변경
                const koreanTime = new Date(repo.updated_at).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})
                console.log(`리포명: ${repo.name} (Last Updated: ${koreanTime})`);
            })
        } else {
            console.log("오류: ", response.status);
        }
        // if (!response.ok) {
        //     console.log("오류: ", response.status);
        // }
        // console.log("내 리포 정보: ", response.data);
    } catch (err) {
        console.error(err.message);
    }
}

fetchgithub();