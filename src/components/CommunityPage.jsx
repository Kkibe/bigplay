import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";

const CommunityPage = ({ communityId }) => {
  const [community, setCommunity] = useState(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchCommunity = async () => {
      const communityDoc = await db.collection("communities").doc(communityId).get();
      setCommunity({ id: communityDoc.id, ...communityDoc.data() });

      const user = auth.currentUser;
      if (user && communityDoc.data().members.includes(user.uid)) {
        setIsMember(true);
      }
    };
    fetchCommunity();
  }, [communityId]);

  const handleJoin = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to join the community");

    await db.collection("communities").doc(communityId).update({
      members: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });

    setIsMember(true);
  };

  return (
    <div>
      {community && (
        <>
          <h1>{community.name}</h1>
          <p>{community.description}</p>
          <p>Funds: {community.funds}</p>
          {!isMember && <button onClick={handleJoin}>Join Community</button>}
        </>
      )}
    </div>
  );
};

export default CommunityPage;
