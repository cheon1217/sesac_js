import axios from "axios";
import { useState } from "react";

const YoutubeApp = () => {
    const [query, setQuery] = useState("");
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    const handleSearchInput = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!query) return;

        try {
            const response = await axios.get(`${BASE_URL}`, {
                params: {
                    part: "snippet",
                    q: query,
                    maxResults: 10,
                    key: API_KEY,
                },
            });

            setVideos(response.data.items);
            setSelectedVideo(null);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    }

    function decodeHtmlEntities(text) {
        const entities = {
            '&#39;': "'",
            '&quot;': '"',
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
        }
        return text.replace(/&#39;|&quot;|&amp;|&lt:|&gt;/g, match => entities[match] || match);
    }

    // useEffect(() => {
    //     const fetchYoutube = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}`, {
    //                 params: {
    //                     part: "snippet,contentDetails,statistics",
    //                     chart: "mostPopular",
    //                     regionCode: "KR",
    //                     maxResults: 10,
    //                     key: API_KEY,
    //                 },
    //             });
    //             setVideos(response.data.items);
    //         } catch (error) {
    //             console.error("에러", error);
    //         }
    //     }

    //     fetchYoutube();
    // }, [API_KEY]); // 시작할 때 최초 한번 외부에 요청해서 결과를 받아옴

    return (
        <div>
            <h1>Popular Videos</h1>
            <input 
                type="text"
                value={query}
                onChange={handleSearchInput}
                placeholder="Search Youtube videos"
            />
            <button onClick={handleSearch}>Search</button>

            {selectedVideo && (
                <div>

                <h2>{selectedVideo.snippet.title}</h2>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                    title="youtube video player"
                ></iframe>
                </div>
            )}

            <ul>
                {videos.map((video) => (
                    <li 
                        key={video.id.videoId}
                        onClick={() => handleVideoSelect(video)}
                    >
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        <h2>{decodeHtmlEntities(video.snippet.title)}</h2>
                        <p>{video.snippet.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default YoutubeApp;