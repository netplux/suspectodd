const { v4: uuidv4 } = require("uuid");
const OnlineUsers = require("./models/online_users");
const Util = require("./utils");
const Game = require("./models/game");
const UserSocket = require("./models/user_socket");

let counter = 0;

const emitEvent = async (io, eventName, userId, data) => {
  const socketId = await UserSocket.getSocket(userId);
  io.to(socketId).emit(eventName, data);
};

const pairUser = async (userId, onlineUsersModel, socket, io) => {
  const randomUserId = await onlineUsersModel.getRandomAvailableUser();
  if (randomUserId) {
    await onlineUsersModel.removeAvailableUser(randomUserId);
    const game = await Game.joinGame(userId, randomUserId);
    const randomIndex = Util.getRandomArbitrary(0, 2);

    console.log("creating a new game with: ", userId, randomUserId);
    const data = {
      gameId: game.id,
      players: [userId, randomUserId],
      currentPlayerId: [userId, randomUserId][randomIndex],
      chats: game.chats,
    };
    await emitEvent(io, "game-joined", userId, { ...data, userId });
    await emitEvent(io, "game-joined", randomUserId, {
      ...data,
      userId: randomUserId,
    });

    // if (userId === data.currentPlayerId) {
    //   await emitEvent(io, "move", userId, true);
    //   await emitEvent(io, "move", randomUserId, false);
    // } else {
    //   await emitEvent(io, "move", userId, false);
    //   await emitEvent(io, "move", randomUserId, true);
    // }
  } else {
    await onlineUsersModel.addAvailableUser(userId, socket);
  }
};

const addOnlineUser = async ({ onlineUsers, userId, socket }) => {
  const userCount = await onlineUsers.addUser(userId);
  socket.emit("online-user-count-updated", { userCount });
};

const handleDisconnect = async ({ socket, onlineUsers, userId, io }) => {
  socket.on("disconnect", async () => {
    counter--;
    console.log("Client disconnected");

    await onlineUsers.removeUser(userId);
    await onlineUsers.removeAvailableUser(userId);
    console.log("user removed successfully", userId);

    await UserSocket.deleteOne({ socketId: socket.id });

    const game = await Game.findOne({ players: userId });
    console.log("the game is :=========", game);
    if (game && Object.keys(game).length) {
      game.players.forEach(async (player) => {
        await UserSocket.deleteOne({ userId: player });
        await emitEvent(io, "game-ended", player, "");
      });
      await Game.deleteOne({ _id: game.id }).then(() => {
        console.log("game deleted successfully");
      });
    }
  });
};

const handlePlayWithOnlinePlayers = async ({
  socket,
  io,
  onlineUsers,
  userId,
}) => {
  await addOnlineUser({ socket, userId, onlineUsers });
  await pairUser(userId, onlineUsers, socket, io);
};

const saveChatAndUpdateClient = async (chat, gameId, io) => {
  const game = await Game.findOne({ _id: gameId });
  if (game) {
    game.chats.push(chat);
    await game.save();

    game.players.forEach(
      async (player) => await emitEvent(io, "chat-updated", player, game.chats)
    );
  }
};

const handleConnect = async (socket, io) => {
  counter++;
  console.log("a new client has been connected  --- count --", counter);

  const userId = socket.handshake.query.data || uuidv4();
  socket.emit("user-connected", { userId });

  try {
    await UserSocket.create({ userId, socketId: socket.id });
  } catch (error) {
    await UserSocket.deleteOne({ userId });
    await UserSocket.create({ userId, socketId: socket.id });
  }

  const onlineUsers = await OnlineUsers.findOne();
  try {
    socket.on("chat", async (data = {}) => {
      const { chat, gameId } = data;
      console.log("the chat is ========", chat, gameId);
      await saveChatAndUpdateClient(chat, gameId, io);
      console.log("chat saved successfully");
    });

    socket.on("friend-joined", async ({ gameId, userId }) => {
      const game = await Game.findOne({ _id: gameId });
      const otherUser = game.players.filter((player) => player !== userId)[0];
      await emitEvent(io, "friend-joined", otherUser, { gameId });
    });

    socket.on("start-game", async ({ gameId }) => {
      const game = await Game.findOne({ _id: gameId });
      if (game) {
        game.players.forEach(async (player) => {
          await emitEvent(io, "game-started", player, "");
        });

        await emitEvent(io, "move", game.players[0], true);
      }
    });

    socket.on(
      "last-character-left",
      async ({ gameId, userId, characterId }) => {
        const game = await Game.findOne({ _id: gameId });
        if (game) {
          const otherPlayer = game.players.filter(
            (player) => player !== userId
          )[0];

          const userCharacter = game.userCharacter;
          const oppositionCharacter = userCharacter[otherPlayer];
          if (oppositionCharacter === characterId) {
            game.players.forEach(async (player) => {
              await emitEvent(io, "game-ended", player, { winner: userId });
            });
          }
        }
      }
    );

    socket.on("play-with-online-player", async () =>
      handlePlayWithOnlinePlayers({
        socket,
        io,
        onlineUsers,
        userId,
      })
    );

    await handleDisconnect({ onlineUsers, userId, socket, io });
  } catch (error) {
    await onlineUsers.removeUser(userId);
    await onlineUsers.removeAvailableUser(userId);
    await UserSocket.deleteOne({ socketId: socket.id });

    const game = await Game.findOne({ userId });
    if (game) {
      game.players.forEach(async (player) => {
        await emitEvent(io, "game-ended", player, "");
      });
    }
  }
};

const SocketHandler = { handleConnect };
module.exports = SocketHandler;
