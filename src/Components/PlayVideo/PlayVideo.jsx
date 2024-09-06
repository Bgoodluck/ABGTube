// import React, { useState, useEffect, useContext } from 'react';
// import './PlayVideo.css';
// import like from '../../assets/like.png';
// import dislike from '../../assets/dislike.png';
// import share from '../../assets/share.png';
// import save from '../../assets/save.png';
// import jack from '../../assets/jack.png';
// import user_profile from '../../assets/user_profile.jpg';
// import { API_KEY, value_converter } from '../../data';
// import moment from 'moment';
// import { useParams } from 'react-router-dom';
// import { TubeContext } from '../../Components/Context/TubeContext';




// function PlayVideo() {

//     const { videoId } = useParams();
//     const { theme } = useContext(TubeContext);


//   const [apiData, setApiData] = useState(null);
//   const [channelData, setChannelData] = useState(null)
//   const [commentData, setCommentData] = useState([])
//   const [error, setError] = useState(null);



//   const fetchVideoData = async () => {
//     try {
//       const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
//       const response = await fetch(videoDetailsUrl);
//       const data = await response.json();
//       if (data.items && data.items.length > 0) {
//         setApiData(data.items[0]);
//       } else {
//         setError('Video data not found');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch video data');
//     }
//   };

//   const fetchOtherData = async () =>{
//     //i used this for fetching channel data for youtube
//     if (!apiData || !apiData.snippet) return; // Ensure apiData and its snippet are not null
//     const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
//     await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))


//     //i used this for fetching comments data from youtube
    
//     const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
//     await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))

//   }

//   useEffect(() => {
//     fetchVideoData();
//   }, [videoId]); // Add videoId as a dependency

//   useEffect(()=>{
//     fetchOtherData();
//   }, [apiData]) // Add apiData as dependency

//   const containerClass = `play-video ${theme}`;

//   return (
//     <div className={containerClass}>
//       <iframe
//         src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//       ></iframe>
//       <h3>{apiData ? apiData.snippet.title : error || "Loading Title..."}</h3>
//       <div className="play-video-info">
//         <p>
//           {apiData ? value_converter(apiData.statistics.viewCount) : "16k"} Views •{' '}
//           {apiData ? moment(apiData.snippet.publishedAt).fromNow() : 'Just Now'}
//         </p>
//         <div>
//         <span><img src={like} alt="Like" /> {apiData ? value_converter(apiData.statistics.likeCount) : 0}</span>
//           <span><img src={dislike} alt="Dislike" /> </span>
//           <span><img src={share} alt="Share" /> Share</span>
//           <span><img src={save} alt="Save" /> Save</span>
//         </div>
//       </div>
//       <hr />
//       <div className="publisher">
//         <img src={channelData?channelData.snippet.thumbnails.default.url : ""} alt="Publisher" />
//         <div>
//           <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
//           <span>{channelData? value_converter(channelData.statistics.subscriberCount): ""} Subscribers</span>
//         </div>
//         <button>Subscribe</button>
//       </div>
//       <div className="vid-description">
//         <p>{apiData ? apiData.snippet.description.slice(0,250) : "Description Here"}</p>
//         <hr />
//         <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} comments</h4>
//         {commentData.map((item, index)=>{
//                 return (
//                     <div className="comment" key={index}>
//                     <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User profile" />
//                     <div>
//                       <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
//                       <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
//                       <div className="comment-action">
//                         <img src={like} alt="Like" />
//                         <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
//                         <img src={dislike} alt="Dislike" />
//                       </div>
//                     </div>
//                   </div>
//                 )
//         })}
        
//       </div>
//     </div>
//   );
// }

// export default PlayVideo;


import React, { useState, useEffect, useContext } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { TubeContext } from '../../Components/Context/TubeContext';

function PlayVideo() {
  const { videoId } = useParams();
  const { theme } = useContext(TubeContext);

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]); // Ensure it is initialized as an array
  const [error, setError] = useState(null);

  const fetchVideoData = async () => {
    try {
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetailsUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        setError('Video data not found');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch video data');
    }
  };

  const fetchOtherData = async () => {
    // Ensure apiData and its snippet are not null
    if (!apiData || !apiData.snippet) return;
    try {
      // Fetching channel data
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelResponse = await fetch(channelData_url);
      const channelData = await channelResponse.json();
      setChannelData(channelData.items[0]);

      // Fetching comments data
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const commentResponse = await fetch(comment_url);
      const commentData = await commentResponse.json();
      setCommentData(commentData.items || []); // Default to an empty array if items is undefined
    } catch (error) {
      console.error('Error fetching other data:', error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  const containerClass = `play-video ${theme}`;

  return (
    <div className={containerClass}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : error || "Loading Title..."}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"} Views •{' '}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : 'Just Now'}
        </p>
        <div>
          <span><img src={like} alt="Like" /> {apiData ? value_converter(apiData.statistics.likeCount) : 0}</span>
          <span><img src={dislike} alt="Dislike" /> </span>
          <span><img src={share} alt="Share" /> Share</span>
          <span><img src={save} alt="Save" /> Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="Publisher" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : ""} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} comments</h4>
        {Array.isArray(commentData) && commentData.map((item, index) => (
          <div className="comment" key={index}>
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User profile" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="Like" />
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="Dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayVideo;
