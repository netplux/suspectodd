import "./App.css";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import GameScreen from "./GameScreen";
import ChoosePlayer from "./ChoosePlayer";

import { Switch, Route, useHistory } from "react-router-dom";
import { SOCKET_END_POINT } from "./utils";
import PlayWithFriend from "./PlayWithFriend";
import Loader from "./Loader/index";
import PlayerInvitation from "./PlayerInvitation";
import HowToPlay from "./HowToPlay";
import GoogleAdSenseFiller from "./GoogleAdSenseFiller";

function App() {
  const [socketObj, setSocketObj] = useState(null);
  const [gameId, setGameId] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [userId, setUserId] = useState("");
  const [gameData, setGameData] = useState({});
  const history = useHistory();
  const [showPlayerInvitation, setShowPlayerInvitation] = useState(false);

  const playWithOnlinePlayers = () => {
    setShowLoader(true);
    socketObj.emit("play-with-online-player");
  };

  const playWithFriend = () => {
    history.push("/play-with-friend");
  };

  useEffect(() => {
    if (gameId) {
      setShowLoader(false);
      history.push(`/games/${gameId}/lobby`);
    }
  }, [gameId, setShowLoader, history]);

  useEffect(() => {
    const url = sessionStorage.getItem("userId")
      ? `${SOCKET_END_POINT}?data=${sessionStorage.getItem("userId")}`
      : SOCKET_END_POINT;

    const socket = socketIOClient(url);
    setSocketObj(socket);

    socket.on("user-connected", ({ userId }) => {
      sessionStorage.setItem("userId", userId);
      setShowPlayerInvitation(true);
    });

    socket.on("game-joined", (data) => {
      const { gameId = "", userId } = data;
      setGameData(data);
      setGameId(gameId);
      setUserId(userId);
    });
    return () => {
      socket.disconnect();
      setSocketObj({});
    };
  }, []);

  return showLoader ? (
    <Loader />
  ) : (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <Switch>
        <Route path="/games/:gameId/invite/:userId">
          {showPlayerInvitation && <PlayerInvitation socketObj={socketObj} />}
        </Route>
        <Route path="/games/:gameId/lobby">
          <GameScreen
            socketObj={socketObj}
            setGameId={setGameId}
            gameData={gameData}
            setGameData={setGameData}
            userIdFromSocket={userId}
          />
        </Route>
        <Route path="/play-with-friend">
          <PlayWithFriend socketObj={socketObj} />
        </Route>
        <Route path="/how-to-play">
          <HowToPlay />
        </Route>
        <Route path="/choose-player">
          <ChoosePlayer
            playWithOnlinePlayers={playWithOnlinePlayers}
            playWithFriend={playWithFriend}
          />
        </Route>
        <Route path="/">
          <GoogleAdSenseFiller />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
