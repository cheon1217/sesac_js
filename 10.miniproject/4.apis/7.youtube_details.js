require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
    console.error("Error: YOUTUBE_API_KEY is not defined in the .env file");
    process.exit(1);
}

const searchUrl = "https://www.googleapis.com/youtube/v3/search";
const videosUrl = "https://www.googleapis.com/youtube/v3/videos";

const searchQuery = "탄핵";

const maxResultsPerPage = 10;
const totalPages = 5;

const searchResults = [];

const fetchYoutubeData = async () => {
    let nextPageToken = null;

    try {
        for (let page = 1; page <= totalPages; page++) {
            const searchParams = {
                part: "snippet",
                q: searchQuery,
                type: "video",
                maxResults: maxResultsPerPage,
                pageToke: nextPageToken,
                key: API_KEY,
            };

            const searchResponse = await axios.get(searchUrl, { params: searchParams });
            const searchData = searchResponse.data;

            searchResults.push(...searchData.items);

            nextPageToken = searchData.nextPageToken;
            if (!nextPageToken) break;
        }

        const table = [];
        for (let index = 0; index < searchResults.length; index++) {
            const result = searchResults[index];
            const title = result.snippet.title;
            const videoId = result.id.videoId;
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            const videoParams = {
                part: "statistics",
                id: videoId,
                key: API_KEY
            };

            const videoResponse = await axios.get(videosUrl, { params: videoParams });
            const videoData = videoResponse.data;

            const viewCount = videoData.items && videoData.items[0]?.statistics?.viewCount ? videoData.items[0].statistics.viewCount : "N/A";

            table.push({ Index: index + 1, Title: title, "View Count": viewCount, "Video URL": videoUrl });
        }

        console.table(table);
    } catch (err) {
        console.error("Error fetching data from Youtube API: ", err.message);
    }
};

fetchYoutubeData();