import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CustomImage } from "../common.styled";
import { API_END_POINT } from "../utils";
import { useHistory } from "react-router-dom";
import Loader from "../Loader/index";
import Modal from "@material-ui/core/Modal";
import Overlay from "../Overlay";

const Wrapper2 = styled("div")`
  grid-area: game-board;
  max-height: 100%;
  @media (min-width: 1024px) {
    width: 680px;
    justify-self: end;

    // margin-left: calc(100vw / 10);
    // min-width: calc(100vw - 350px);
  }
  @media (min-width: 1268px) {
    width: 800px;
    margin-left: calc(100vw / 15);
  }

  @media (max-width: 1023px) {
    max-height: calc(100vh - 200px);
  }
`;
const GameBoardWrapper = styled("div")`
  padding: 10px;
  height: 100%;
  display: grid;
  grid-gap: 2px;
  position: relative;
  margin-left: ${({ modal }) => (modal ? "0" : "35px")};
  @media (max-width: 1023px) {
    grid-template-columns: repeat(auto-fill, minmax(calc(100vw / 7), 1fr));
  }
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ImageWrapper = styled("span")`
  cursor: pointer;
  position: relative;
`;

const OverlayDiv = styled("div")`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 6px;
  right: 0;
  height: 97%;
  width: 93%;
  opacity: 0.7;
  border-radius: 10px;
  transition: 0.5s ease;
  background-color: red;

  @media (max-width: 540px) {
    left: 1px;
  }
`;

const ModalWrapper = styled("div")`
  margin: 0 auto;
  background: white;
  border-radius: 5px;
  overflow-y: scroll;
  // maxheight: "calc(100vh-30px)";
  max-width: 800px;
`;

const Wrapper = ({ id, src, onClick, decrementCount, modal }) => {
  const [cross, setCross] = useState(false);

  const handleClick = () => {
    if (onClick) {
      // choose your character case
      onClick(id, src);
    } else {
      // cross is about to happen
      if (decrementCount) {
        cross ? decrementCount(id, 1) : decrementCount(id, -1);
      }
      console.log("calling cross with =====", cross);
      setCross(!cross);
      // setTimeout(() => {
      // }, );
    }
  };
  return (
    <ImageWrapper onClick={handleClick} modal={modal}>
      <CustomImage src={src} alt="game-character" />
      {cross && <OverlayDiv />}
    </ImageWrapper>
  );
};

const GameBoard = ({
  gameId,
  userId,
  socketObj,
  replyReceived,
  setChosenCharacterImage,
}) => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showBoard, setShowBoard] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (replyReceived) {
      setShowBoard(true);
    } else {
      setShowBoard(false);
    }
  }, [replyReceived, setShowBoard]);

  useEffect(() => {
    fetch(`${API_END_POINT}/game-data?gameId=${gameId}`)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setCharacterCount(data.length);
      });

    if (socketObj) {
      socketObj.on("game-started", () => {
        setShowModal(false);
        toast.success("Game started");
      });
      socketObj.on("game-ended", ({ winner }) => {
        if (winner && winner === userId) {
          toast.success("You won");
        } else if (winner && winner !== userId) {
          toast.error("You lost");
        }
        history.push("/");
      });
    }
  }, [gameId, history, socketObj, userId]);

  const decrementCount = (id, counter) => {
    setSelectedImages([...selectedImages, id]);
    setCharacterCount(characterCount + counter);
  };

  useEffect(() => {
    if (characterCount === 1) {
      if (socketObj) {
        const difference = images
          .map((i) => i.id)
          .filter((x) => selectedImages.indexOf(x) === -1)[0];
        socketObj.emit("last-character-left", {
          gameId,
          userId,
          characterId: difference,
        });
      }
    }
  }, [characterCount, socketObj, gameId, userId, images, selectedImages]);

  const chooseCharacter = (characterId, characterImageUrl = "") => {
    setChosenCharacterImage(characterImageUrl);
    const url = `${API_END_POINT}/update-character?gameId=${gameId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, characterId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowLoader(true);
        const { event } = data;
        if (socketObj && event === "start-game") {
          socketObj.emit("start-game", { gameId });
        }
      });
  };

  console.log("============ the show board is: ", showBoard);
  return (
    <>
      <Wrapper2>
        <GameBoardWrapper>
          <Overlay show={!showBoard} />
          {images.map((image) => (
            <Wrapper
              key={image.id}
              id={image.id}
              src={image.url}
              decrementCount={decrementCount}
            />
          ))}
        </GameBoardWrapper>
      </Wrapper2>

      <Modal
        open={showModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalWrapper>
          {showLoader ? (
            <Loader
              message="Waiting for other player to choose the character"
              padding="10px auto"
            />
          ) : (
            <>
              <div
                style={{
                  display: "block",
                  textAlign: "center",
                }}
              >
                <h2>Choose your character</h2>
              </div>
              <GameBoardWrapper modal={true}>
                {images.map((image) => (
                  <Wrapper
                    key={image.id}
                    id={image.id}
                    src={image.url}
                    onClick={chooseCharacter}
                    modal={true}
                  />
                ))}
              </GameBoardWrapper>
            </>
          )}
        </ModalWrapper>
      </Modal>
    </>
  );
};

export default GameBoard;
