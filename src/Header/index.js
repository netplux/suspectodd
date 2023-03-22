import styled from "styled-components";
import Logo from "../images/logo.png";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const HeaderWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-area: header;
  border-bottom: 1px solid #e0e0e0;
  justify-items: center;
  align-items: center;
`;

const ImageWrapper = styled("div")`
  width: 270px;
  height: 60px;

  @media (max-width: 540px) {
    width: 170px;
    height: 30px;
  }
`;

const CustomButton = withStyles((theme) => ({
  root: {
    marginLeft: "25px",
    fontSize: "inherit",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "12px",
    },
  },
}))(Button);

const Header = () => {
  const history = useHistory();

  const handleClick = (event) => {
    history.push("/how-to-play");
    // if (event.target.name === "how-to-play") {
    //   }
  };

  return (
    <HeaderWrapper>
      <CustomButton
        onClick={handleClick}
        variant="contained"
        name="how-to-play"
        style={{
          justifySelf: "left",
          marginLeft: "10px",
        }}
      >
        How to Play
      </CustomButton>
      <ImageWrapper>
        <img style={{ height: "100%", width: "100%" }} src={Logo} alt="logo" />
      </ImageWrapper>
      <CustomButton
        variant="contained"
        style={{
          justifySelf: "right",
          marginRight: "10px",
        }}
      >
        Remove Ads
      </CustomButton>
    </HeaderWrapper>
  );
};

export default Header;
