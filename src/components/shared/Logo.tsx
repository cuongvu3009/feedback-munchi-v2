import Image from "next/image";
import MomotokoLogo from "../assets/MomotokoLogo.png";

const Logo = () => {
  return (
    <div className="logo-container">
      <Image src={MomotokoLogo} alt="MomotokoLogo" className="logo" />

      <div className="restaurant-name">Momotoko</div>
    </div>
  );
};

export default Logo;
