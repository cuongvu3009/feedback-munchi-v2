import MomotokoLogo from "../assets/MomotokoLogo.png";

const LogoFlex = () => {
  return (
    <div className="flex">
      <div className="logo">
        <img src={MomotokoLogo} alt="MomotokoLogo" />
      </div>
      <div className="restaurant-name">Momotoko</div>
    </div>
  );
};

export default LogoFlex;
