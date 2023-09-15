"use client";

import React from "react";
import useProtectedPage from "@/hooks/useProtectedPage";

const Settings = () => {
  useProtectedPage();
  return <div>settings</div>;
};

export default Settings;
