import { GrLogout } from "react-icons/gr";
import React from "react";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const LogoutBtn = () => {
  const { logout } = useAuthenticate();
  const { removeItem } = useLocalStorage();

  const handleLogout = () => {
    logout();
    removeItem("business");
  };

  const buttonStyles = {
    color: "#000",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    display: "flex",
    gap: "4px",
    alignItems: "center",
  };

  return (
    <>
      <button
        className="custom-button"
        style={buttonStyles}
        onClick={handleLogout}
      >
        <GrLogout />
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;
