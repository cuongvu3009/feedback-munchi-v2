import MomotokoLogo from "../assets/MomotokoLogo.png";

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo">
        <img src={MomotokoLogo} alt="MomotokoLogo" />
      </div>
      <div className="restaurant-name">Momotoko</div>
    </div>
  );
};

export default Logo;
