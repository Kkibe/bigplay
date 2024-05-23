import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const WatchLater = ({ videoId }) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const checkWatchLater = async () => {
      const user = auth.currentUser;
      if (user) {
        const watchLaterDoc = await db.collection("users").doc(user.uid).collection("watchLater").doc(videoId).get();
        setAdded(watchLaterDoc.exists);
      }
    };
    checkWatchLater();
  }, [videoId]);

  const handleAddToWatchLater = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to add to Watch Later");

    await db.collection("users").doc(user.uid).collection("watchLater").doc(videoId).set({});
    setAdded(true);
  };

  return (
    <button onClick={handleAddToWatchLater} disabled={added}>
      {added ? "Added to Watch Later" : "Add to Watch Later"}
    </button>
  );
};

export default WatchLater;
