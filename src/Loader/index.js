import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({
  Type = ClipLoader,
  size = 150,
  message = "Looking for a player",
  margin = "0 auto",
}) => {
  return (
    <div style={{ textAlign: "center", margin: margin }}>
      <h2>{message}</h2>
      <Type size={size} />
    </div>
  );
};

export default Loader;
