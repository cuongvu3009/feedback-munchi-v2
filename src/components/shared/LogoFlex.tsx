import Image from "next/image";
import MomotokoLogo from "../assets/MomotokoLogo.png";

const LogoFlex = () => {
  return (
    <div className="flex">
      <div className="logo">
        <Image src={MomotokoLogo} alt="MomotokoLogo" />
      </div>
      <div className="restaurant-name">Momotoko</div>
    </div>
  );
};

export default LogoFlex;
