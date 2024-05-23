import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const unsubscribe = db.collection("videos")
      .doc(videoId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setComments(snapshot.docs.map(doc => doc.data()));
      });

    return () => unsubscribe();
  }, [videoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return alert("Please sign in to comment");

    await db.collection("videos").doc(videoId).collection("comments").add({
      text: commentText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
    });

    setCommentText("");
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Submit</button>
      </form>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <p><strong>{comment.user}</strong> {comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
