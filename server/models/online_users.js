const mongoose = require("mongoose");
const Util = require("../utils");

const { Schema } = mongoose;

const onlineUsersSchema = new Schema({
  ids: Array,
  availableIds: Array,
});

onlineUsersSchema.methods.addUser = async (uuid) => {
  let count = 0;
  const onlineUsers = await mongoose.model("OnlineUser").findOne();
  if (!onlineUsers) {
    await mongoose.model("OnlineUser").create({ ids: [uuid] });
    count = 1;
  } else {
    onlineUsers.ids.push(uuid);
    count = onlineUsers.ids.length + 1;
    await onlineUsers.save();
  }
  return count;
};

onlineUsersSchema.methods.removeUser = async (uuid) => {
  const onlineUsers = await mongoose.model("OnlineUser").findOne();
  if (onlineUsers) {
    onlineUsers.ids.pull(uuid);
    await onlineUsers.save();
  }
};

onlineUsersSchema.methods.addAvailableUser = async (uuid) => {
  const onlineUsers = await mongoose.model("OnlineUser").findOne();
  if (!onlineUsers) {
    await mongoose.model("OnlineUser").create({ availableIds: [uuid] });
  } else {
    onlineUsers.availableIds.push(uuid);
    await onlineUsers.save();
  }
};
onlineUsersSchema.methods.removeAvailableUser = async (uuid) => {
  const onlineUsers = await mongoose.model("OnlineUser").findOne();
  if (onlineUsers) {
    onlineUsers.availableIds.pull(uuid);
    await onlineUsers.save();
  }
};

onlineUsersSchema.methods.getRandomAvailableUser = async () => {
  const onlineUsers = await mongoose.model("OnlineUser").findOne();
  if (onlineUsers && onlineUsers.availableIds) {
    const randomIndex = parseInt(
      Util.getRandomArbitrary(0, onlineUsers.availableIds.length),
      10
    );
    return onlineUsers.availableIds[randomIndex];
  }
};

const OnlineUsers = mongoose.model("OnlineUser", onlineUsersSchema);
module.exports = OnlineUsers;
