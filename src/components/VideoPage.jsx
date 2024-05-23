import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Comments from "./Comments.jsx";

const VideoPage = ({ match }) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const videoDoc = await db.collection("videos").doc(match.params.id).get();
      setVideo(videoDoc.data());
    };

    fetchVideo();
  }, [match.params.id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div className="video-page">
      <h1>{video.title}</h1>
      <video src={video.url} controls />
      <p>{video.description}</p>
      <div className="tags">
        {video.tags.map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <Comments videoId={match.params.id} />
    </div>
  );
};

export default VideoPage;
