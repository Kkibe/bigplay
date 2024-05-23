import React, { useState } from "react";
import { db } from "./firebase";
import VideoCard from "./VideoCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const videosSnapshot = await db.collection("videos").where("title", "==", query).get();
    setResults(videosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for videos..." />
        <button type="submit">Search</button>
      </form>
      <div className="results">
        {results.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Search;
