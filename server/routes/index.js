var express = require("express");
const Game = require("../models/game");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("hii there");
});

const createGame = async (userId) => {
  return await Game.create({
    players: [userId],
    winnerId: null,
    currentPlayerId: null,
    chats: [],
  });
};

router.post("/games", async (req, res) => {
  let { userId = undefined } = req.body;

  let game = undefined;
  if (userId) {
    game = await Game.findOne({ players: userId });
    if (!game) {
      game = await createGame(userId);
    }
  } else {
    userId = uuidv4();
    game = await createGame(userId);
  }
  res.send({ gameId: game.id, userId });
});

router.put("/join-game", async (req, res) => {
  let { gameId, userId: otherUserId, newUserId } = req.body;
  let data, status;

  if (!gameId || !otherUserId) {
    status = 422;
    data = { error: "Incorrect gameId or userId" };
  } else {
    const game = await Game.findOne({ _id: gameId });
    if (!game) {
      status = 404;
      data = { error: "Game does not exists" };
    } else if (game.players.length === 2) {
      status = 422;
      data = { error: "Game already full, can't join" };
    } else {
      const userId = newUserId || uuidv4();
      game.players.push(userId);
      await game.save();
      status = 200;
      data = { gameId, userId };
    }
  }

  res.status(status).json(data);
});

const getRandomImages = ({ gameId }) => {
  let imageCount = 24;
  const seenIndex = [];
  const finalImageArray = [];

  while (imageCount) {
    let x = 1 + Math.floor(Math.random() * 42);
    if (seenIndex.indexOf(x) === -1) {
      const dataObj = {
        id: `${gameId}${x}`,
        url: `/characters/${x}.png`,
      };
      seenIndex.push(x);
      finalImageArray.push(dataObj);
      imageCount--;
    }
  }
  return finalImageArray;
};

router.get("/game-data", async (req, res, next) => {
  const { gameId } = req.query;
  if (!gameId) {
    res.send({ error: "No Game present" });
  }
  const game = await Game.findOne({ _id: gameId });
  if (game && game.gameData && game.gameData.length) {
    res.send(game.gameData);
  } else {
    const gameData = getRandomImages({ gameId });
    game.gameData = gameData;
    await game.save();
    res.send(gameData);
  }
});

router.put("/update-character", async (req, res, next) => {
  const { gameId } = req.query;
  const { userId, characterId } = req.body;
  if (!gameId) {
    res.status(422).json({ error: "No Game present" });
    return;
  }

  const game = await Game.findOne({ _id: gameId });
  if (!game) {
    res.status(404).json({ error: "couldn't find the game" });
    return;
  }

  if (!game.userCharacter) {
    game.userCharacter = {};
  }
  game.userCharacter = { ...game.userCharacter, [userId]: characterId };
  await game.save();

  if (Object.keys(game.userCharacter).length === 2) {
    res.send({ event: "start-game" });
  } else {
    res.send({});
  }
});

module.exports = router;
