import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const descriptionContent = {
  Scalping: {
    title: "Scalping 🚀",
    description:
      "Scalping is a web application that functions as an intermediary platform between investors and the stock market. Its primary purpose is to facilitate the buying and selling of stocks for investors. The term Scalping refers to a trading strategy in which traders buy and sell stocks quickly, seeking to make small profits on each trade. Scalping offers various convenient features for investors to buy and sell stocks.",
  },
  Option: {
    title: "Option 📈",
    description:
      "Unlock the potential of options trading with the revolutionary Option Strategy Application. Designed to simplify and automate the execution of option strategies, our application empowers traders with convenience and efficiency. Automated Option Strategies: Say goodbye to manual execution and let our application handle it for you. With 20 pre-built option strategies at your fingertips, you can easily select and execute the strategies that align with your trading goals and risk appetite.",
  },
  Candlestick: {
    title: "Candlestick 🔥",
    description:
      "The Candlestick Pattern Application is a powerful tool designed for market research and trading analysis through the observation of chart and candlestick patterns. This application employs historical price data to identify various candlestick patterns, such as doji, hammer, engulfing, and more, within different timeframes. The application's main objective is to assist traders and researchers in gaining insights into market trends, potential reversals, and momentum shifts.",
  },
};

const DiscriptionData = ({ Type }) => {
  const content = descriptionContent[Type] || {}; // Default empty object

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Card className="card" sx={{ background: "#f5f5f5", boxShadow: 3 }}>
        <CardContent>
          <Typography  variant="h5" fontWeight="bold" color="text.primary">
            {content.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {content.description}
          </Typography>
        </CardContent>
      </Card>

      <Card className="card" sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Profile 📝</Typography>
          <Typography variant="body2">
            Profile contains all your personal information which you enter while
            signing up an account including Mobile number, Email address, and
            selected Broker. You can also change your account password on the
            Profile page.
          </Typography>
        </CardContent>
      </Card>

      <Card className="card" sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Broker Credentials 💼</Typography>
          <Typography variant="body2">
            To buy or sell stocks, users can fill in the necessary broker
            credentials:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="User can select a broker." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User can fill in the broker username." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User can fill in the App API key." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Then continue trading." />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card className="card" sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Add Script Parameter 🛠️</Typography>
          <Typography variant="body2">Scalping:</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Single Script: Users can choose percentage or points to set their booking and re-entry points." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Fixed Price: Users can set a specific price for entry." />
            </ListItem>
            <ListItem>
              <ListItemText primary="One Directional: Sets a fixed point and target point for continuous averaging." />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card className="card" sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Steps to Add Script 📝</Typography>
          <List>
            <ListItem>
              <ListItemText primary="User selects market options and Instrument details." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User selects buy or sell options." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User sets booking and re-entry points in percentage or points." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User enters the quantity to trade." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User selects Paper trade or Live trade." />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DiscriptionData;
