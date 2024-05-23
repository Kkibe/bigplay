import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const Likes = ({ videoId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLike, setUserLike] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      const videoDoc = await db.collection("videos").doc(videoId).get();
      const data = videoDoc.data();
      setLikes(data.likes || 0);
      setDislikes(data.dislikes || 0);
      const user = auth.currentUser;
      if (user) {
        const userLikeDoc = await db.collection("videos").doc(videoId).collection("userLikes").doc(user.uid).get();
        if (userLikeDoc.exists) {
          setUserLike(userLikeDoc.data().like);
        }
      }
    };
    fetchLikes();
  }, [videoId]);

  const handleLike = async (like) => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to like or dislike");

    const videoRef = db.collection("videos").doc(videoId);
    const userLikeRef = videoRef.collection("userLikes").doc(user.uid);

    await db.runTransaction(async (transaction) => {
      const videoDoc = await transaction.get(videoRef);
      const videoData = videoDoc.data();
      let newLikes = videoData.likes || 0;
      let newDislikes = videoData.dislikes || 0;

      if (like === true) {
        newLikes += 1;
        if (userLike === false) {
          newDislikes -= 1;
        }
      } else {
        newDislikes += 1;
        if (userLike === true) {
          newLikes -= 1;
        }
      }

      transaction.update(videoRef, {
        likes: newLikes,
        dislikes: newDislikes,
      });
      transaction.set(userLikeRef, { like }, { merge: true });
    });

    setLikes((prev) => (like === true ? prev + 1 : prev - 1));
    setDislikes((prev) => (like === false ? prev + 1 : prev - 1));
    setUserLike(like);
  };

  return (
    <div className="likes">
      <button onClick={() => handleLike(true)} disabled={userLike === true}>Like {likes}</button>
      <button onClick={() => handleLike(false)} disabled={userLike === false}>Dislike {dislikes}</button>
    </div>
  );
};

export default Likes;
