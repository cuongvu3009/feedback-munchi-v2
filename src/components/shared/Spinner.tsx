import React from "react";
import spinner from "../assets/spinner.gif";

const Spinner: React.FC = () => {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "20px", margin: "auto", display: "block" }}
    />
  );
};

export default Spinner;
