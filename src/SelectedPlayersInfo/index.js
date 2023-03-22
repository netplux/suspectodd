import styled from "styled-components";
import OtherPlayer from "../images/question-mark.png";
import { CustomImage } from "../common.styled";

const SelectedPlayersInfoWrapper = styled("div")`
  grid-area: other-player-info;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

const ImageWrapper = styled("div")`
  width: 80px;
  height: 80px;
  margin-top: 10px;
  display: ${({ display }) => (display ? display : "block")};
  justify-self: ${({ justifySelf }) => (justifySelf ? justifySelf : "inherit")};

  @media (max-width: 540px) {
    display: block;
    justify-self: ${({ justifySelf }) =>
      justifySelf ? justifySelf : "inherit"};
    margin-top: ${({ justifySelf }) => (justifySelf ? "15px" : "inherit")};
    height: 60px;
    width: 60px;
  }

  @media (min-width: 541px) and (max-width: 767px) {
    display: block;
    justify-self: ${({ justifySelf }) =>
      justifySelf ? justifySelf : "inherit"};
    margin-top: ${({ justifySelf }) => (justifySelf ? "15px" : "inherit")};
    height: 60px;
    width: 60px;
  }
`;

const SelectedPlayerWrapper = styled("div")`
  justify-self: left;
  margin-left: 35px;
  justify-self: end;

  @media (max-width: 1023px) {
    margin-left: 5px;
  }
`;

const SelectedPlayer = ({ chosenCharacterImage }) => {
  return (
    <SelectedPlayerWrapper>
      <ImageWrapper display="inline-block">
        <CustomImage
          src={chosenCharacterImage}
          alt="other-player"
          style={{
            borderRight: "3px solid gray",
            paddingRight: "10px",
          }}
        />
      </ImageWrapper>
    </SelectedPlayerWrapper>
  );
};

const SelectedPlayersInfo = ({ chosenCharacterImage }) => {
  return (
    <SelectedPlayersInfoWrapper>
      <SelectedPlayer chosenCharacterImage={chosenCharacterImage} />
      <ImageWrapper>
        <CustomImage src={OtherPlayer} alt="other-player" />
      </ImageWrapper>
    </SelectedPlayersInfoWrapper>
  );
};

export default SelectedPlayersInfo;
