import { IoMdReturnLeft } from "react-icons/io";
import React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const ChangeBusinessBtn = () => {
  const { removeItem } = useLocalStorage();
  const router = useRouter();

  const handleChangeBusiness = () => {
    removeItem("business");
    removeItem("businessId");
    router.push("/dashboard/businessOption");
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
        onClick={handleChangeBusiness}
      >
        <IoMdReturnLeft />
        Return
      </button>
    </>
  );
};

export default ChangeBusinessBtn;
