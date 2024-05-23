import React, { useState } from "react";
import { db, auth } from "./firebase";

const Subscription = ({ communityId }) => {
  const [amount, setAmount] = useState(0);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to contribute funds");

    await db.collection("communities").doc(communityId).update({
      funds: firebase.firestore.FieldValue.increment(amount),
    });

    await db.collection("users").doc(user.uid).collection("subscriptions").doc(communityId).set({
      communityId,
      amount,
    });

    setAmount(0);
  };

  return (
    <form onSubmit={handleSubscribe}>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" required />
      <button type="submit">Contribute</button>
    </form>
  );
};

export default Subscription;
