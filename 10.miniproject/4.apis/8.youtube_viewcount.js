const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
    console.error("YOUTUBE_API_KEY는 필수 입력 사항입니다.");
    process.exit(1);
}

const searchUrlAPI = "https://www.googleapis.com/youtube/v3/search";
const videoUrlAPI = "https://www.googleapis.com/youtube/v3/videos";

const maxResultPerPage = 10;
const totalPages = 5;

const searchResult = [];

const fetchYoutube = async () => {
    let nextPageToken = null;

    try {
        for (let page = 1; page <= totalPages; page++) {
            const params = {
                part: 'snippet',
                q: '자바스크립트 개발',
                type: 'video',
                maxResults: maxResultPerPage,
                pageToken: nextPageToken,
                key: API_KEY,
            }

            const response = await axios.get(searchUrlAPI, { params });
            const data = response.data;

            // console.log('data.items = ', data.items);
            searchResult.push(...data.items);

            // 다음 페이지의 ID
            nextPageToken = data.nextPageToken;
            console.log('다음 페이지: ', nextPageToken);
        }

        const table = [];
        // const videoInfo = data.items.forEach(item => {
        // searchResult.forEach(async (item) => {
        for (let index = 0; index < searchResult.length; index++) {
            item = searchResult[index];
            // console.log('각각의 비디오 클립 조회: ', item);
            let title = item.snippet.title; // 영상 제목
            const videoId = item.id?.videoId // Video clip ID
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
            const description = item.snippet.description; // 영상 설명

            // 각각의 비디오 클립에 대해서 추가 정보를 조회
            const videoParams = {
                part: 'statistics',
                id: videoId,
                key: API_KEY,
            }

            const maxTitleLength = 30;
            if (title.length > maxTitleLength) {
                title = title.slice(0, maxTitleLength) + "...";
            };

            const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
            const videoData = videoResponse.data;
            const viewCount = videoData.items[0].statistics?.viewCount || 'N/A';
            console.log(videoData.items?.[0]?.statistics.viewCount);
            table.push({ Index: index + 1, Title: title, 'ViewCount': viewCount, 'VideoURL': videoUrl });
        }

        // Table 형태로 출력
        console.table(table);
    } catch (error) {
        console.error('요청 실패: ', error.message);
        // console.trace('요청 실패');
    }
};

// fetchYoutube();


const fetchYoutube_parallel = async () => {
    let nextPageToken = null;

    try {
        for (let page = 1; page <= totalPages; page++) {
            const params = {
                part: 'snippet',
                q: '아이유',
                type: 'video',
                maxResults: maxResultPerPage,
                pageToken: nextPageToken,
                key: API_KEY,
            }

            console.log("start req");
            const response = await axios.get(searchUrlAPI, { params });
            console.log("end req");
            const data = response.data;

            // console.log('data.items = ', data.items);
            searchResult.push(...data.items);
        }
        
        /// Promise.all을 통해서 전체를 병행처리
        const table = await Promise.all(
            searchResult.map(async (item, index) => {
                // console.log('각각의 비디오 클립 조회: ', item);
                let title = item.snippet.title; // 영상 제목
                const videoId = item.id?.videoId // Video clip ID
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
                const description = item.snippet.description; // 영상 설명

                // 각각의 비디오 클립에 대해서 추가 정보를 조회
                const videoParams = {
                    part: 'statistics',
                    id: videoId,
                    key: API_KEY,
                }

                const maxTitleLength = 30;
                if (title.length > maxTitleLength) {
                    title = title.slice(0, maxTitleLength) + "...";
                };

                const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
                const videoData = videoResponse.data;
                const viewCount = videoData.items[0]?.statistics?.viewCount || 'N/A';
                return { Index: index + 1, Title: title, 'ViewCount': viewCount, 'VideoURL': videoUrl };
            })
        )
        console.table(table);
    } catch (err) {
        console.error(err);
    }
};

console.time("실행시간");
(async () => {
    await fetchYoutube_parallel();
    // await fetchYoutube();
})
console.timeEnd("실행시간");