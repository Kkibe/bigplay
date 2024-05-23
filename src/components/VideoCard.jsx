import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <video src={video.previewUrl} muted loop />
      </div>
      <h3>{video.title}</h3>
    </div>
  );
};

export default VideoCard;
