import React, { useState } from "react";
import { storage, db, auth } from "./firebase";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to upload");

    const storageRef = storage.ref();
    const videoRef = storageRef.child(`videos/${videoFile.name}`);
    await videoRef.put(videoFile);

    const videoUrl = await videoRef.getDownloadURL();

    await db.collection("videos").add({
      title,
      description,
      tags: tags.split(","),
      url: videoUrl,
      uploaderId: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTitle("");
    setDescription("");
    setTags("");
    setVideoFile(null);
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" required />
      <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadVideo;
