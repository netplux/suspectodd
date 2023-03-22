import React from "react";
import AnswerOptions from "../AnswerOptions";
import GameBoard from "../GameBoard";
import GameChat from "../GameChat";
import SelectedPlayersInfo from "../SelectedPlayersInfo";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const GameScreen = ({
  socketObj,
  setGameId,
  gameData = {},
  setGameData,
  userIdFromSocket,
}) => {
  const [replyReceived, setReplyReceived] = useState(false);
  const [chosenCharacterImage, setChosenCharacterImage] = useState("");

  const history = useHistory();
  const { gameId } = useParams();

  console.log("the game id is: =======", gameId);
  const userId = userIdFromSocket || sessionStorage.getItem("userId");

  useEffect(() => {
    if (socketObj) {
      socketObj.on("game-ended", () => {
        setGameData({});
        setGameId(null);
        toast.warn("Your game has been ended!");
      });
      socketObj.on("move", (data) => {
        if (data) {
          toast.success("It's your turn, please ask a question");
        }
      });
    }
  }, [setGameData, setGameId, socketObj]);

  if (!socketObj) {
    history.push("/");
    return null;
  }

  return (
    <>
      <SelectedPlayersInfo chosenCharacterImage={chosenCharacterImage} />
      <GameBoard
        gameId={gameId}
        userId={userId}
        socketObj={socketObj}
        setChosenCharacterImage={setChosenCharacterImage}
        replyReceived={replyReceived}
      />
      <AnswerOptions socketObj={socketObj} userId={userId} gameId={gameId} />
      <GameChat
        gameId={gameId}
        userId={userId}
        socketObj={socketObj}
        setReplyReceived={setReplyReceived}
      />
    </>
  );
};

export default GameScreen;
