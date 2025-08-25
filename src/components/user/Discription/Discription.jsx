import React, { useState } from "react";
import DiscriptionData from "./DiscriptionData";
import Content from "../../../ExtraComponent/Content";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Discription = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Content
      Page_title={"📄 Description"}
      button_status={false}
      backbutton_status={true}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          {/* 🛠️ Styled Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#f8f9fa", // Light background for tabs
              borderRadius: "8px 8px 0 0",
              padding: "10px",
              width: "100%",
            }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                "& .MuiTab-root": {
                  width: "33.33%", // Equal width for all tabs
                  fontSize: "20px", // Bigger font size
                  fontWeight: "bold", // Bold text
                  textTransform: "none", // Remove uppercase
                  padding: "12px 20px",
                },
                "& .Mui-selected": {
                  color: "#1976d2", // Highlight active tab
                  borderBottom: "3px solid #1976d2", // Underline effect
                },
              }}>
              <Tab label=" 📊 Scalping" value="1" />
              <Tab label=" ⚡ Option" value="2" />
              <Tab label="📈 Candlestick" value="3" />
            </TabList>
          </Box>

          {/* Tabs Content */}
          <TabPanel value="1">
            <DiscriptionData Type={"Scalping"} />
          </TabPanel>
          <TabPanel value="2">
            <DiscriptionData Type={"Option"} />
          </TabPanel>
          <TabPanel value="3">
            <DiscriptionData Type={"Candlestick"} />
          </TabPanel>
        </TabContext>
      </Box>
    </Content>
  );
};

export default Discription;
