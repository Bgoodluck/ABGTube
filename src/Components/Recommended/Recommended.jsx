import React, { useState, useEffect, useContext } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';
import { TubeContext } from '../Context/TubeContext';



function Recommended({ categoryId }) {
    const { theme } = useContext(TubeContext);
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);



    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

        try {
            const res = await fetch(relatedVideo_url);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data.items) {
                setApiData(data.items);
            } else {
                setError("No videos found");
                setApiData([]); 
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch data");
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    const RecommendedClass = `recommended ${theme}`;

    return (
        <div className={RecommendedClass}>
            {error && <p className="error-message">{error}</p>}
            {apiData.map((item, index) => (
                <Link
                    to={`/video/${item.snippet.categoryId}/${item.id}`}
                    className="side-video-list"
                    key={index}
                >
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vide-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} Views</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Recommended;
