import React from "react";
import styled from "styled-components";

const HowToPlayWrapper = styled("div")`
  text-align: left;
  white-space: pre-wrap;
  grid-area: other-player-info;
  word-break: break-word;
  justify-self: center;
  // width: 100%;
`;

const HowToPlay = () => {
  return (
    <HowToPlayWrapper>
      <h2 style={{ paddingLeft: "10px" }}>How to play</h2>
      <h4 style={{ paddingLeft: "10px" }}>
        This game is just like the actual Guess Who board game with following
        rules:
      </h4>
      <ul>
        <li>choose 1 character among 24 characters</li>
        <li>wait for the other player to choose 1 character as well</li>
        <li>
          when the game starts, asks a question about other player's character
          using the chat feature{" "}
        </li>
        <li>
          after getting a reply, mark the characters which you think does match
          your question
        </li>
        <li>
          reply to other player using the 3 buttons provided (yes, maybe, no)
        </li>
        <li>
          the player which guesses the other player character first would be the
          winner.
        </li>
      </ul>
    </HowToPlayWrapper>
  );
};

export default HowToPlay;
