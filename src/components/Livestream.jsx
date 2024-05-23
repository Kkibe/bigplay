import React, { useState } from "react";
import { db, auth, storage } from "./firebase";

const LiveStream = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [streamKey, setStreamKey] = useState("");

  const handleStartStream = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to start a live stream");

    const streamKey = generateStreamKey(); // Assume you have a function to generate a unique stream key
    setStreamKey(streamKey);

    await db.collection("liveStreams").add({
      title,
      description,
      streamKey,
      uploaderId: user.uid,
      startedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="live-stream">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Stream Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Stream Description"></textarea>
      <button onClick={handleStartStream}>Start Live Stream</button>
      {streamKey && <p>Stream Key: {streamKey}</p>}
    </div>
  );
};

export default LiveStream;
