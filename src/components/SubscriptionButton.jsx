import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const SubscribeButton = ({ uploaderId }) => {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const user = auth.currentUser;
      if (user) {
        const subscriptionDoc = await db.collection("users").doc(user.uid).collection("subscriptions").doc(uploaderId).get();
        setSubscribed(subscriptionDoc.exists);
      }
    };
    checkSubscription();
  }, [uploaderId]);

  const handleSubscribe = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to subscribe");

    await db.collection("users").doc(user.uid).collection("subscriptions").doc(uploaderId).set({});
    setSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to unsubscribe");

    await db.collection("users").doc(user.uid).collection("subscriptions").doc(uploaderId).delete();
    setSubscribed(false);
  };

  return (
    <button onClick={subscribed ? handleUnsubscribe : handleSubscribe}>
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
