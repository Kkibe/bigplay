import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const user = auth.currentUser;
      if (user) {
        const videosSnapshot = await db.collection("videos").where("uploaderId", "==", user.uid).get();
        const videoData = await Promise.all(videosSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            views: data.views,
            watchTime: data.watchTime,  // Assume you have a field for watch time
            demographics: data.demographics,  // Assume you have a field for demographics
          };
        }));
        setAnalytics(videoData);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-dashboard">
      <h3>Video Analytics</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Watch Time</th>
            <th>Demographics</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map(video => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.views}</td>
              <td>{video.watchTime}</td>
              <td>{JSON.stringify(video.demographics)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsDashboard;
