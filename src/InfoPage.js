import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const InfoPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container
        sx={{
          textAlign: "center",
          mt: 5,
          color: "#ffffff",
          background: "#121212",
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* 🔙 Go Back Button */}
        <Button
          variant="contained"
          sx={{
            mb: 3,
            backgroundColor: "#00e5ff",
            color: "#121212",
            "&:hover": { backgroundColor: "#00bcd4" },
          }}
          onClick={() => navigate(-1)}
        >
          🔙 Go Back
        </Button>

        {/* ℹ️ About CryptoPulse */}
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#00e5ff" }}>
          ℹ️ About CryptoPulse
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          CryptoPulse is a <strong>real-time cryptocurrency tracking platform</strong> that provides users with up-to-date market trends, historical data, and key insights into the world of digital assets.
        </Typography>

        {/* 🌎 What We Offer */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#00e676" }}>
          🌎 What We Offer
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          - 📊 <strong>Live Price Tracking</strong>: Get instant updates on the latest cryptocurrency prices.  
          - 📉 <strong>Market Trends</strong>: Analyze market cap, supply, and price fluctuations.  
          - ⏳ <strong>Historical Data</strong>: View all-time highs, lows, and past performance.  
          - 🔎 <strong>Search & Filter</strong>: Easily find any cryptocurrency and track its details.  
        </Typography>

        {/* 🔒 Our Mission */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#ffeb3b" }}>
          🔒 Our Mission
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          At CryptoPulse, we aim to <strong>simplify the cryptocurrency market</strong> for investors, traders, and enthusiasts by providing <strong>accurate, real-time data</strong> in a user-friendly interface.
        </Typography>

        
      </Container>
    </motion.div>
  );
};

export default InfoPage;
