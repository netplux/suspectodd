const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
  players: Array,
  winnerId: String,
  currentPlayerId: String,
  chats: Array,
  userCharacter: Object,
  gameData: Array,
  active: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

gameSchema.statics.joinGame = async (player1Id, player2Id) => {
  const game = await mongoose.model("Game").create({
    players: [player1Id, player2Id],
    chats: [],
    roomId: player2Id,
  });

  return game;
};

gameSchema.methods.startGame = async (gameId) => {
  const game = await mongoose.model("Game").findOne({ _id: gameId });
  game.active = true;
  await game.save();
};

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
