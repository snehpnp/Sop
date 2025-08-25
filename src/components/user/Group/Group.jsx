import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "./GroupStyles.css";
import { useNavigate } from "react-router-dom";
import GroupCard from "./GroupCard";
import Content from "../../../ExtraComponent/Content";
import { GetGroupNames } from "../../CommonAPI/Admin";
import NoDataFound from "../../../ExtraComponent/NoDataFound";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// Dummy data for each strategy
// const strategies = [
//   {
//     name: "Scalp",
//     type: "My Strategy",
//     created: "30 days ago",
//     category: ["Scalping", "BANKNIFTY", "INTRADAY"],
//     backtestAvailable: true,
//     data: [25, 8, 12, 1, 0, 5, 30, 50, 40],
//   },
//   {
//     name: "Bank Nifty Tolot",
//     type: "Template",
//     created: "3 years ago by CA Shailesh Rughani",
//     category: ["4 Leg", "BANKNIFTY", "INTRADAY"],
//     backtestAvailable: true,
//     data: [2, 8, 12, 18, 10, 25],
//   },
//   {
//     name: "Bank Nifty Bulls Eye",
//     type: "Template",
//     created: "3 years ago by Parag Makhecha",
//     category: ["4 Leg", "Nifty Bank", "INTRADAY"],
//     backtestAvailable: true,
//     data: [0, 50, 0, 60],
//   },
//   {
//     name: "Bank Nifty Super Power",
//     type: "Template",
//     created: "3 years ago by CA Shailesh Rughani",
//     category: ["4 Leg", "Nifty Bank", "INTRADAY"],
//     backtestAvailable: true,
//     data: [5, 15, 8, 20, 12, 30],
//   },
//   {
//     name: "Bank Nifty Dynamic Index 001",
//     type: "Template",
//     created: "3 years ago by Aastha Inv.",
//     premium: false,
//     category: ["2 Leg", "BANKNIFTY", "INTRADAY"],
//     backtestAvailable: true,
//     data: [10, 20, 15, 30, 18, 40],
//   },
// ];

// Reusable Strategy Card Component

// Strategy List Component
const GroupStrategyList = () => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await GetGroupNames();
      const updatedGroups = response.Data.map((group, index) => ({
        name: group.GroupName, // Set name as GroupName from API response
        // type: "My Strategy",
        // created: "30 days ago",
        category: ["Scalping", "BANKNIFTY", "INTRADAY"], // Adjust this as needed
        backtestAvailable: true,
        data: [25, 8, 12, 1, 0, 5, 30, 50, 40],
      }));

      setGroup(updatedGroups);
    };
    fetchGroups();
  }, []);

  return (
    <Content
      Page_title={"📌 All Groups"}
      button_status={false}
      backbutton_status={false}>
      <div className="group-container">
        {group && group.length > 0 ? (
          group.map((group, index) => (
            <GroupCard key={index} strategy={group} />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </Content>
  );
};

export default GroupStrategyList;
