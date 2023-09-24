import "../feedbackLayout.css";

import Image from "next/image";
import React from "react";
import munchi from "@/components/assets/munchiLogo.png";

const TradeMark: React.FC = () => {
  return (
    <div className="munchi-logo">
      <p>Powered by </p> <Image src={munchi} alt="munchi-logo" />
    </div>
  );
};

export default TradeMark;
