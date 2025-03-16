import React from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

const CryptoCard = ({ crypto }) => {
  const navigate = useNavigate(); // initialize navigate

  // Handler for navigating to the coin's detail page
  const handleClick = () => {
    navigate(`/coin/${crypto.id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
        <Card
          onClick={handleClick} // added the click handler
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
            textDecoration: "none",
            border: "1px solid #444",
            padding: "15px",
            "&:hover": { backgroundColor: "#2e2e2e" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            cursor: "pointer", // added cursor pointer for better UX
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffffff", mt: 2 }}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </Typography>
            <Typography variant="body1" sx={{ color: "#00e676", mt: 1 }}>
              💰 Price: ${crypto.current_price.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: crypto.price_change_percentage_24h >= 0 ? "#00e676" : "#ff1744", fontWeight: "bold", mt: 1 }}>
              {crypto.price_change_percentage_24h >= 0 ? "📈" : "📉"} 24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default CryptoCard;
