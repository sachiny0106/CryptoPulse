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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: { vs_currency: "usd", order: "market_cap_desc", per_page: 30, page: 1 },
        });
        setCryptos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5));
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

      {/* 📌 Footer with Info Page Link */}
      <Box sx={{ backgroundColor: "#1e1e1e", color: "#ffffff", py: 2, textAlign: "center", mt: "auto" }}>
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

// ✅ Crypto Card Component
const CryptoCard = ({ crypto }) => {
  const navigate = useNavigate();
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
        <Card
          onClick={() => navigate(`/coin/${crypto.id}`)}
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "15px",
            padding: "15px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div animate={{ scale: [0.8, 1], rotate: [0, 360] }} transition={{ duration: 1 }}>
              <Avatar src={crypto.image} alt={crypto.name} sx={{ width: 80, height: 80, mb: 2 }} />
            </motion.div>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffffff", mt: 1 }}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </Typography>
            <Typography variant="body1" sx={{ color: "#00e676", mt: 1 }}>
              💰 Price: ${crypto.current_price.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: isPositive ? "#00e676" : "#ff1744", fontWeight: "bold", mt: 1 }}>
              {isPositive ? "📈" : "📉"} 24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default Home;
