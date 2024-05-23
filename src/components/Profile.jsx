import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);

      if (currentUser) {
        const uploadedVideosSnapshot = await db.collection("videos").where("uploaderId", "==", currentUser.uid).get();
        setUploadedVideos(uploadedVideosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const likedVideosSnapshot = await db.collectionGroup("userLikes").where("like", "==", true).where("userId", "==", currentUser.uid).get();
        setLikedVideos(likedVideosSnapshot.docs.map(doc => doc.ref.parent.parent.get().then(doc => ({ id: doc.id, ...doc.data() }))));
        
        const watchLaterSnapshot = await db.collection("users").doc(currentUser.uid).collection("watchLater").get();
        setWatchLaterVideos(watchLaterSnapshot.docs.map(doc => doc.ref.parent.parent.get().then(doc => ({ id: doc.id, ...doc.data() }))));
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userProfile = await db.collection("users").doc(user.uid).get();
        setUser({ id: user.uid, ...userProfile.data() });
      }
    };

    const fetchUserSubscriptions = async () => {
      const user = auth.currentUser;
      if (user) {
        const subscriptionsSnapshot = await db.collection("users").doc(user.uid).collection("subscriptions").get();
        setSubscriptions(subscriptionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    const fetchUserTokens = async () => {
      const user = auth.currentUser;
      if (user) {
        const tokensSnapshot = await db.collection("users").doc(user.uid).collection("tokens").get();
        setTokens(tokensSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    fetchUserProfile();
    fetchUserSubscriptions();
    fetchUserTokens();
  }, []);

  const handleEditProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      await db.collection("users").doc(user.uid).update({ name: updatedName });
      setUser({ ...user, name: updatedName });
      setEditing(false);
    }
  };

  return (
    <div className="profile">
      {user && (
        <div className="user-info">
          <h2>{editing ? <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} /> : user.name}</h2>
          <p>Email: {user.email}</p>
          {editing ? (
            <button onClick={handleEditProfile}>Save</button>
          ) : (
            <button onClick={() => { setEditing(true); setUpdatedName(user.name); }}>Edit Profile</button>
          )}
        </div>
      )}

      <div className="user-subscriptions">
        <h3>Your Subscriptions</h3>
        <ul>
          {subscriptions.map(subscription => (
            <li key={subscription.id}>
              Community ID: {subscription.communityId} | Amount: {subscription.amount}
            </li>
          ))}
        </ul>
      </div>

      <div className="user-tokens">
        <h3>Your Tokens</h3>
        <ul>
          {tokens.map(token => (
            <li key={token.id}>
              Community ID: {token.communityId} | Tokens: {token.tokens}
            </li>
          ))}
        </ul>
      </div>

      <div className="user-activity">
        <h3>Your Activity</h3>
        <p>(Here you can display user activity logs within communities if you have this data stored in your database)</p>
      </div>
    </div>
  );
};

export default Profile;
