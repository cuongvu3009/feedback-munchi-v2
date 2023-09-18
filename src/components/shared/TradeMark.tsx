import Image from "next/image";
import React from "react";
import munchi from "../assets/munchiLogo.png";

const TradeMark: React.FC = () => {
  return (
    <div className="munchi-logo">
      <Image src={munchi} alt="munchi-logo" />
    </div>
  );
};

export default TradeMark;
