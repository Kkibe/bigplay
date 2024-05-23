import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";

const EarnTokens = ({ communityId }) => {
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const fetchTokens = async () => {
      const user = auth.currentUser;
      if (user) {
        const tokenDoc = await db.collection("users").doc(user.uid).collection("tokens").doc(communityId).get();
        if (tokenDoc.exists) {
          setTokens(tokenDoc.data().tokens);
        }
      }
    };
    fetchTokens();
  }, [communityId]);

  const handleEarnTokens = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to earn tokens");

    await db.collection("users").doc(user.uid).collection("tokens").doc(communityId).set({
      tokens: firebase.firestore.FieldValue.increment(10), // Example: earn 10 tokens per activity
    }, { merge: true });

    setTokens(tokens + 10);
  };

  return (
    <div>
      <p>Tokens: {tokens}</p>
      <button onClick={handleEarnTokens}>Earn Tokens</button>
    </div>
  );
};

export default EarnTokens;
