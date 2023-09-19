import Image from "next/image";
import React from "react";
import spinner from "../assets/spinner.gif";

const Spinner: React.FC = () => {
  return (
    <Image
      src={spinner}
      alt="Loading..."
      style={{ width: "20px", margin: "auto", display: "block" }}
    />
  );
};

export default Spinner;
