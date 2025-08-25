import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Typography, Box, Button } from "@mui/material";
import { FaPhone, FaEnvelope, FaUserTie, FaClipboardList, FaUsers, FaRegStar, FaCalendarAlt, FaTag } from "react-icons/fa";
import { Get_Profile_Data, reGenerateKeyApi } from "../../CommonAPI/User";
import Content from "../../../ExtraComponent/Content";
import Swal from "sweetalert2"; // Import SweetAlert

const ProfilePage = () => {
  const username = localStorage.getItem("name");

  const [data, setData] = useState({ loading: true, profile: {} });
  const [showMore, setShowMore] = useState(false); // State to toggle "Show More"

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const requestData = { username };
        const response = await Get_Profile_Data(requestData);

        if (response.Status) {
          localStorage.setItem("expire", 0);
          localStorage.setItem("profileData", JSON.stringify(response?.Data[0]));
          setData({ loading: false, profile: response?.Data[0] });
        } else {
          if (response.message === "Client Expired") {
            localStorage.setItem("expire", 1);
          }
          setData({ loading: false, profile: {} });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setData({ loading: false, profile: {} });
      }
    };

    getProfileData();
  }, []);

  const regenerateKey = async () => {
    try {
      const data = { Username: username };
      const res = await reGenerateKeyApi(data);

      if (res.Status) {
        Swal.fire({
          icon: "success",
          title: "Pin Regenerated Successfully",
          text: "The new pin has been sent to your registered email.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to regenerate the pin. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error regenerating key:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const { Mobile_No, EmailId, BrokerName, NumberofScript, Group, ActivePlan, Strategytag } = data.profile;

  const infoItems = [
    { icon: <FaPhone />, label: "Phone", value: Mobile_No || "-" },
    { icon: <FaEnvelope />, label: "Email", value: EmailId || "-" },
    { icon: <FaUserTie />, label: "Broker", value: BrokerName || "-" },
    { icon: <FaClipboardList />, label: "Scripts", value: NumberofScript || "-" },
    { icon: <FaUsers />, label: "Group", value: Group?.length ? Group.join(", ") : "No Group Available" },
    { icon: <FaCalendarAlt />, label: "Service End Date", value: data.profile.ServiceEndDate || "-" },
    {
      icon: <FaRegStar />,
      label: "Active Plan",
      value: ActivePlan?.length ? ActivePlan.join(", ") : "No Plan Available",
    },
    { icon: <FaTag />, label: "Strategy Tag", value: Array.isArray(Strategytag) ? Strategytag.join(", ") : (Strategytag || "-") },

  ];

  return (
    <Content Page_title={"📄 All Strategy"} button_status={false} backbutton_status={true}>
      <Container sx={{ paddingTop: "5%", maxWidth: "1200px", color: "var(--text-color)" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Card className="card-bg-color" sx={{ padding: 4, borderRadius: 2 }}>
              {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" className="card-text-Color" sx={{ fontWeight: "bold" }}>
                  {username}
                </Typography>
                <button className="addbtn" style={{ marginLeft: "auto" }} onClick={regenerateKey}>
                  Re-Generate Key
                </button>
              </Box> */}
              <Grid container spacing={3}>
                {infoItems.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      className="card-bg-color"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}>
                      <Box sx={{ fontSize: 24, marginRight: 2 }} className="card-text-Color">
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" className="card-text-Color" sx={{ fontWeight: "bold" }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body1" className="card-text-Color">
                          {item.value}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Content>
  );
};

export default ProfilePage;
