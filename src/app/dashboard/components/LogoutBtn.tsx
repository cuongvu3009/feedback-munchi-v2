import { GrLogout } from "react-icons/gr";
import React from "react";
import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useBusinessContext } from "@/context/BusinessContext";
const LogoutBtn = () => {
  const { setBusiness, setBusinessId } = useBusinessContext();

  const handleLogout = () => {
    setBusinessId(undefined);
    setBusiness(undefined);
    deleteCookie("user");

    toast.success("Log out successful!");
    window.location.reload();
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
