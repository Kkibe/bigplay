import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const user = auth.currentUser;
      if (user) {
        const notificationsSnapshot = await db.collection("users").doc(user.uid).collection("notifications").orderBy("timestamp", "desc").get();
        setNotifications(notificationsSnapshot.docs.map(doc => doc.data()));
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          <Link to={`/video/${notification.videoId}`}>
            {notification.message}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
