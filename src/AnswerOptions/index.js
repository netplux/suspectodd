import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const AnswerOptionsWrapper = styled("div")`
  grid-area: answer-options;
  margin-top: 15px;
  @media (min-width: 540px) and (max-width: 768px) {
    margin-top: 0;
  }
`;

const CustomButton = withStyles((theme) => ({
  root: {
    color: "white",
    margin: "0 10px",
    borderRadius: "10px",
    fontSize: "16px",
    width: "100px",
    height: "50px",
    [theme.breakpoints.down("sm")]: {
      width: "70px",
      height: "30px",
    },
    [theme.breakpoints.up("md")]: {
      width: "90px",
      height: "40px",
      marginTop: "2px",
    },
  },
}))(Button);

const AnswerOptions = ({ socketObj, userId, gameId }) => {
  const sendMessage = (message) => {
    if (socketObj) {
      socketObj.emit("chat", { chat: { sender: userId, message }, gameId });
    }
  };

  return (
    <AnswerOptionsWrapper>
      <CustomButton
        onClick={() => sendMessage("Yes")}
        variant="contained"
        style={{
          backgroundColor: "#91c688",
        }}
      >
        Yes
      </CustomButton>
      <CustomButton
        onClick={() => sendMessage("Maybe")}
        variant="contained"
        style={{
          backgroundColor: "#d9ad4f",
        }}
      >
        Maybe
      </CustomButton>
      <CustomButton
        onClick={() => sendMessage("No")}
        variant="contained"
        style={{
          backgroundColor: "#bb6245",
        }}
      >
        No
      </CustomButton>
    </AnswerOptionsWrapper>
  );
};

export default AnswerOptions;
