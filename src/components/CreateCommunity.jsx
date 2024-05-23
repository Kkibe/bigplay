import React, { useState } from "react";
import { db, auth } from "./firebase";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to create a community");

    await db.collection("communities").add({
      name,
      description,
      ownerId: user.uid,
      members: [user.uid],
      funds: 0,
    });

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleCreateCommunity}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Community Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
      <button type="submit">Create Community</button>
    </form>
  );
};

export default CreateCommunity;
