import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import VideoCard from "./VideoCard";

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videosSnapshot = await db.collection("videos").get();
      setVideos(videosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchVideos();
  }, []);

  return (
    <div className="home-page">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default HomePage;
