import { GrLogout } from "react-icons/gr";
import React from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
import { useBusinessContext } from "@/context/BusinessContext";

const LogoutBtn = () => {
  const { setBusiness, setBusinessId } = useBusinessContext();
  const { setUser } = useAuthContext();

  const handleLogout = () => {
    setBusinessId(undefined);
    setBusiness(undefined);
    setUser(null);

    toast.success("Log out successful!");
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
