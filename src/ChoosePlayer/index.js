import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ChoosePlayerWrapper = styled("div")`
  margin: 20px auto;
  max-width: 600px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-area: other-player-info;

  @media (max-width: 540px) {
    margin: 20px 5px;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 60px;
  }
`;

const ChoosePlayer = ({ playWithOnlinePlayers, playWithFriend }) => {
  return (
    <ChoosePlayerWrapper>
      <Button
        variant="contained"
        color="secondary"
        onClick={playWithOnlinePlayers}
      >
        Play with Online Player
      </Button>
      <Button variant="contained" color="secondary" onClick={playWithFriend}>
        Play with a Friend
      </Button>
    </ChoosePlayerWrapper>
  );
};

export default ChoosePlayer;
