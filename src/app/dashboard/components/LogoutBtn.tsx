import { GrLogout } from "react-icons/gr";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useBusinessContext } from "@/context/BusinessContext";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const { setBusiness, setBusinessId } = useBusinessContext();
  const { setUser } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    setBusinessId(undefined);
    setBusiness(undefined);
    setUser(null);
    router.push("/dashboard/login");
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
