import React, { useState } from "react";
import { db, auth, storage } from "./firebase";

const VideoEditor = ({ videoId }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [filter, setFilter] = useState("none");

  const handleEditVideo = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to edit videos");

    const videoRef = db.collection("videos").doc(videoId);
    await videoRef.update({
      start,
      end,
      filter,
    });

    alert("Video edited successfully!");
  };

  return (
    <div className="video-editor">
      <input type="number" value={start} onChange={(e) => setStart(e.target.value)} placeholder="Start Time (seconds)" />
      <input type="number" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="End Time (seconds)" />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="none">None</option>
        <option value="grayscale">Grayscale</option>
        <option value="sepia">Sepia</option>
        <option value="invert">Invert</option>
      </select>
      <button onClick={handleEditVideo}>Edit Video</button>
    </div>
  );
};

export default VideoEditor;
