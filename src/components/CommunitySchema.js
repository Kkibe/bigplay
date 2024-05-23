export const CommunitySchema = {
    name: String,
    description: String,
    ownerId: String,
    members: [String], // List of user IDs
    funds: Number,
  };
  