import "./dashboard.css";

import DashboardInfo from "@/components/dashboard/info/DashboardInfo";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <DashboardInfo />
    </div>
  );
};

export default Dashboard;
