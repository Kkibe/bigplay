import React from "react";
import CreateCommunity from "./CreateCommunity";
import CommunityPage from "./CommunityPage";
import Subscription from "./Subscription";
import EarnTokens from "./EarnTokens";

const CommunityDashboard = ({ communityId }) => {
  return (
    <div>
      <CreateCommunity />
      <CommunityPage communityId={communityId} />
      <Subscription communityId={communityId} />
      <EarnTokens communityId={communityId} />
    </div>
  );
};

export default CommunityDashboard;
