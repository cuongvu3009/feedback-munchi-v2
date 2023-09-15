import React from "react";
import munchi from "../assets/munchiLogo.png";

const TradeMark: React.FC = () => {
  return (
    <div className="munchi-logo flex">
      <img src={munchi} alt="munchi-logo" />
    </div>
  );
};

export default TradeMark;
