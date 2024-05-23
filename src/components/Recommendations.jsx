import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import VideoCard from "./VideoCard";

const Recommendations = () => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch user preferences or history to determine recommendations
        const userDoc = await db.collection("users").doc(user.uid).get();
        const preferences = userDoc.data().preferences || [];

        // Fetch recommended videos based on preferences
        const recommendedVideosSnapshot = await db.collection("videos").where("tags", "array-contains-any", preferences).limit(10).get();
        setRecommendedVideos(recommendedVideosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations">
      <h3>Recommended for you</h3>
      {recommendedVideos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default Recommendations;
