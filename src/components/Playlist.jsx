import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const user = auth.currentUser;
      if (user) {
        const playlistsSnapshot = await db.collection("users").doc(user.uid).collection("playlists").get();
        setPlaylists(playlistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to create a playlist");

    await db.collection("users").doc(user.uid).collection("playlists").add({
      name: newPlaylist,
    });
    setNewPlaylist("");
  };

  return (
    <div className="playlists">
      <form onSubmit={handleCreatePlaylist}>
        <input type="text" value={newPlaylist} onChange={(e) => setNewPlaylist(e.target.value)} placeholder="New Playlist Name" />
        <button type="submit">Create Playlist</button>
      </form>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
