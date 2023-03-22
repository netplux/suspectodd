import { useState, useEffect } from "react";
import { API_END_POINT } from "../utils";
import styled from "styled-components";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const PlayWithFriendWrapper = styled("div")`
  margin: 0 auto;
  grid-area: other-player-info;
  padding: 15px;
  width: 100%;
  text-align: center;
`;

const PlayWithFriend = ({ socketObj }) => {
  const [showShareUrl, setShowShareUrl] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    const url = `${API_END_POINT}/games`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: sessionStorage.getItem("userId") }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { gameId, userId } = data;
        setShareUrl(`${window.location.host}/games/${gameId}/invite/${userId}`);
        setShowShareUrl(true);
      });
  }, []);

  useEffect(() => {
    if (socketObj) {
      socketObj.on("friend-joined", ({ gameId }) => {
        history.push({ pathname: `/games/${gameId}/lobby` });
      });

      socketObj.on("user-connected", ({ userId }) => {
        sessionStorage.setItem("userId", userId);
      });
    }
  }, [socketObj, history]);

  return (
    <PlayWithFriendWrapper>
      {!showShareUrl ? (
        <Loader message="Generating the share link" />
      ) : (
        <>
          <h3>
            Copy (click to copy) and Share the below Url to start the game:
          </h3>
          <CopyToClipboard
            text={shareUrl}
            onCopy={() => {
              toast.success("Copied!");
            }}
          >
            <span
              style={{
                cursor: "pointer",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {shareUrl}
            </span>
          </CopyToClipboard>
          <Loader message="Waiting for your friend to join" />
        </>
      )}
    </PlayWithFriendWrapper>
  );
};

export default PlayWithFriend;
