const mongoose = require("mongoose");
const OnlineUsers = require("./online_users");
const { Schema } = mongoose;

const userSocketSchema = new Schema({
  userId: { type: String, unique: true, index: true },
  socketId: { type: String, unique: true },
});

userSocketSchema.statics.getSocket = async (userId) => {
  const userSocket = await mongoose.model("UserSocket").findOne({ userId });
  if (!userSocket) {
    const onlineUsers = await OnlineUsers.findOne();
    await onlineUsers.removeAvailableUser(userId);
    return;
  }
  return userSocket.socketId;
};

const UserSocket = mongoose.model("UserSocket", userSocketSchema);
module.exports = UserSocket;
