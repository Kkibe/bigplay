import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";

const Analytics = ({ videoId }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const incrementView = async () => {
      const videoRef = db.collection("videos").doc(videoId);
      await videoRef.update({ views: firebase.firestore.FieldValue.increment(1) });

      const videoDoc = await videoRef.get();
      setViews(videoDoc.data().views);
    };

    incrementView();
  }, [videoId]);

  return (
    <div className="analytics">
      <p>{views} views</p>
    </div>
  );
};

export default Analytics;
