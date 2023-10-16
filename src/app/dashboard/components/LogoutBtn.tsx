import { GrLogout } from "react-icons/gr";
import React from "react";
import { toast } from "react-toastify";
import { useBusinessContext } from "@/context/BusinessContext";
import { useCookies } from "react-cookie";

const LogoutBtn = () => {
  const { setBusiness, setBusinessId } = useBusinessContext();
  const [, , removeCookie] = useCookies(["user"]); // Use removeCookie to remove the "user" cookie

  const handleLogout = () => {
    setBusinessId(undefined);
    setBusiness(undefined);
    removeCookie("user");
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
