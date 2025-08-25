import { colors } from "@mui/material";
import React, { useEffect, useState } from "react";
const newsData = ['🔔 Oops! Your plan has expired. Please renew it to get back on track! ⏳'];
const NewsTicker = () => {
    return (
        <marquee className="mb-2" style={{ fontSize: "1.3rem" , color:"red" }}><b >{newsData}</b></marquee>
    )
};
export default NewsTicker;