import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import SendButtonImg from "../images/send-button.svg";
import { Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import ChatRoom from "../ChatRoom";

const GameChatWrapper = styled("div")`
  grid-area: game-chat;
  width: 100%;
  align-self: end;
  padding: 2px;
`;

const ChatWrapper = styled("div")`
  // height: 120px;
  // overflow: scroll;
  background-color: #eef2f5;
  border-radius: 10px 10px 0 0;
  // position: relative;

  @media (min-width: 768px) {
    height: 200px;
  }
  @media (min-width: 1024px) {
    height: 100%;
    width: 350px;
  }
`;

const CustomInput = styled("input")`
  width: 100%;
  height: 30px;
  background-color: #f4f7f9;
  border: none;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    height: 60px;
    font-size: 20px;
  }
`;

const SendButtonWrapper = styled("div")`
  width: 30px;
  height: 28px;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 3px;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 50px;
    height: 48px;
  }
`;

const GameChat = ({ socketObj, gameId, userId, setReplyReceived }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketObj.on("chat-updated", (chatData) => {
      setMessages(chatData);
      const lastChat = chatData[chatData.length - 1];
      if (chatData.length >= 2 && lastChat.sender !== userId) {
        // got a reply
        setReplyReceived(true);
      }
    });
  }, [socketObj, setMessages, setReplyReceived, userId]);

  console.log("the chats id is : ", messages);
  const handleNewMessage = (newMessage) => {
    socketObj.emit("chat", newMessage);
    setReplyReceived(false);
  };

  return (
    <GameChatWrapper>
      <ChatWrapper>
        <ChatRoom
          owner={userId}
          messages={messages}
          setMessages={setMessages}
          sendMessage={handleNewMessage}
          gameId={gameId}
        />
      </ChatWrapper>
    </GameChatWrapper>
  );
};

export default GameChat;
