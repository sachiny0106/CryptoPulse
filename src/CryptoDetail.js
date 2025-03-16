import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress, Box, Button, Avatar, Divider } from "@mui/material";

const CryptoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCrypto(response.data);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrypto();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} sx={{ color: "#4caf50" }} />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        textAlign: "center",
        mt: 5,
        p: 4,
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
      }}
    >
      <Avatar src={crypto.image.large} alt={crypto.name} sx={{ width: 100, height: 100, margin: "auto", mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </Typography>

      <Divider sx={{ backgroundColor: "#444", my: 2 }} />

      <Typography variant="h6" sx={{ color: "#00e676", mb: 1 }}>
        💰 Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}
      </Typography>
      <Typography variant="h6" sx={{ color: "#ffeb3b", mb: 1 }}>
        📉 All-Time Low: ${crypto.market_data.atl.usd} (on {crypto.market_data.atl_date.usd.split("T")[0]})
      </Typography>
      <Typography variant="h6" sx={{ color: "#ff9800", mb: 1 }}>
        📈 All-Time High: ${crypto.market_data.ath.usd} (on {crypto.market_data.ath_date.usd.split("T")[0]})
      </Typography>

      <Divider sx={{ backgroundColor: "#444", my: 2 }} />

      <Typography variant="h6" sx={{ color: "#64b5f6", mb: 1 }}>
        🔄 Circulating Supply: {crypto.market_data.circulating_supply.toLocaleString()}
      </Typography>
      <Typography variant="h6" sx={{ color: "#f06292", mb: 1 }}>
        🏦 Total Supply: {crypto.market_data.total_supply ? crypto.market_data.total_supply.toLocaleString() : "N/A"}
      </Typography>

      <Divider sx={{ backgroundColor: "#444", my: 3 }} />

      {/* Go Back Button at the Bottom */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(-1)}
        sx={{
          mt: 3,
          backgroundColor: "#00e676",
          color: "#000",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#00c853" },
        }}
      >
        🔙 Go Back
      </Button>
    </Container>
  );
};

export default CryptoDetail;
