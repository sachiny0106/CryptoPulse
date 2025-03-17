import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Container,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: { vs_currency: "usd", order: "market_cap_desc", per_page: 30, page: 1 },
      })
      .then((response) => {
        setCryptos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5));
  };

  const handleNavigate = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container
        sx={{
          flex: 1,
          textAlign: "center",
          background: "#121212",
          padding: 4,
          borderRadius: 3,
          color: "#ffffff",
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#ffffff", mb: 3 }}>
            🚀 CryptoPulse – Live Crypto Prices
          </Typography>
        </motion.div>

        {/* 🔍 Search Bar */}
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <TextField
            sx={{
              mb: 2,
              width: "50%",
              borderRadius: 2,
              background: "#1e1e1e",
              color: "white",
              input: { color: "#ffffff" },
            }}
            label="Search Cryptocurrency"
            placeholder="Type to search..."
            variant="outlined"
            InputProps={{
              style: { color: "#ffffff" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#ffffff" }} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </motion.div>

        {/* 🔽 Clickable Search Recommendations */}
        {searchResults.length > 0 && (
          <List
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: 2,
              boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.1)",
              width: "50%",
              margin: "auto",
              mt: 1,
            }}
          >
            {searchResults.map((crypto, index) => (
              <motion.div key={crypto.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ListItem
                  component="div"
                  onClick={() => handleNavigate(crypto.id)}
                  sx={{
                    "&:hover": { backgroundColor: "#444", color: "#ffffff" },
                    transition: "0.3s",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={crypto.image} alt={crypto.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${crypto.name} (${crypto.symbol.toUpperCase()})`}
                    secondary={`💰 $${crypto.current_price.toFixed(2)} | 24h: ${
                      crypto.price_change_percentage_24h >= 0 ? "📈" : "📉"
                    } ${crypto.price_change_percentage_24h.toFixed(2)}%`}
                  />
                </ListItem>
                {index < searchResults.length - 1 && <Divider sx={{ backgroundColor: "#444" }} />}
              </motion.div>
            ))}
          </List>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress size={60} sx={{ color: "#ffffff" }} />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 3, justifyContent: "center" }}>
            {cryptos.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </Grid>
        )}
      </Container>

      {/* 📌 Fixed Footer */}
      <Box sx={{ backgroundColor: "#1e1e1e", color: "#ffffff", py: 2, textAlign: "center", position: "relative", bottom: 0 }}>
        <Typography variant="body2">
          © 2025 CryptoPulse. All Rights Reserved. |{" "}
          <Link to="/info" style={{ color: "#00e5ff", textDecoration: "none" }}>
            More Info
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

// ✅ Crypto Card Component with Icons & 24h Change
const CryptoCard = ({ crypto }) => {
  const navigate = useNavigate();
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
        <Box onClick={() => navigate(`/coin/${crypto.id}`)} sx={{ cursor: "pointer", width: "100%" }}>
          <Card
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
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar src={crypto.image} sx={{ width: 60, height: 60, mb: 1 }} />
              <Typography variant="h6">{crypto.name} ({crypto.symbol.toUpperCase()})</Typography>
              <Typography variant="body1" sx={{ color: "#00e676", mt: 1 }}>💰 ${crypto.current_price.toFixed(2)}</Typography>
              <Typography variant="body2" sx={{ color: isPositive ? "#00e676" : "#ff1744", fontWeight: "bold", mt: 1 }}>
                {isPositive ? "📈" : "📉"} 24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default Home;
