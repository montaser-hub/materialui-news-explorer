import { useEffect, useRef, useState } from "react";
import { axoinstance } from "../AxiosInstance/AxiosInstance";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Share, Visibility } from "@mui/icons-material";

// The free NewsAPI plan allows 100 requests a day, so search waits until typing pauses.
const SEARCH_DELAY_MS = 600;
const MIN_QUERY_LENGTH = 2;

function errorMessage(err) {
  const status = err.response?.status;
  if (status === 401) return "NewsAPI rejected the key. Set NEWSAPI_KEY in .env and restart the dev server.";
  if (status === 429) return "The daily NewsAPI request limit was reached. Try again tomorrow.";
  return err.response?.data?.message || "Couldn't load articles.";
}

export default function Home() {
  const [input, setInput] = useState("technology");
  const [topic, setTopic] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Debounce: the topic follows the input once typing pauses.
  useEffect(() => {
    const trimmed = input.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) return;
    const timer = setTimeout(() => setTopic(trimmed), SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    let ignore = false; // drop responses for a topic that has since changed
    setLoading(true);
    setError("");
    axoinstance
      .get("/everything", { params: { q: topic, language: "en", pageSize: 24, sortBy: "publishedAt" } })
      .then((res) => {
        if (!ignore) setArticles((res.data.articles || []).filter((a) => a.title !== "[Removed]"));
      })
      .catch((err) => {
        if (!ignore) {
          setArticles([]);
          setError(errorMessage(err));
        }
      })
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [topic]);

  // Titles among the loaded articles that match what is being typed.
  const suggestions = input.trim()
    ? articles.filter((a) => a.title?.toLowerCase().includes(input.trim().toLowerCase())).slice(0, 8)
    : [];

  const handleShare = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: article.description, url: article.url });
      } catch {
        // The user closed the share sheet.
      }
    } else {
      await navigator.clipboard.writeText(article.url);
      alert("Link copied to clipboard!");
    }
  };

  // Close suggestions when clicking outside the search box.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        📰 News Explorer
      </Typography>

      <Box
        ref={searchRef}
        sx={{ position: "relative", mb: 5, mx: "auto", width: { xs: "100%", sm: 420 } }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Search topic"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim().length >= MIN_QUERY_LENGTH) setTopic(input.trim());
            if (e.key === "Escape") setShowSuggestions(false);
          }}
        />

        {showSuggestions && suggestions.length > 0 && (
          <Paper
            component="ul"
            elevation={4}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
              mt: 0.5,
              width: "100%",
              maxHeight: 250,
              overflowY: "auto",
              position: "absolute",
              zIndex: 10,
            }}
          >
            {suggestions.map((item) => (
              <Box
                component="li"
                key={item.url}
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Box
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    display: "block",
                    px: 1.5,
                    py: 1.25,
                    color: "text.primary",
                    textDecoration: "none",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  {item.title}
                </Box>
              </Box>
            ))}
          </Paper>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : articles.length > 0 ? (
        <Grid container spacing={3} sx={{ maxWidth: 1400, mx: "auto" }}>
          {articles.map((article) => (
            <Grid key={article.url} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: "flex" }}>
              <Card
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": { transform: "translateY(-6px)", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" },
                }}
              >
                {article.urlToImage && (
                  <CardMedia component="img" height="160" image={article.urlToImage} alt="" loading="lazy" />
                )}
                <CardContent sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption" color="text.secondary">
                    {article.source?.name} · {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.description || "No description available."}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Button
                      variant="contained"
                      size="small"
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      startIcon={<Visibility />}
                    >
                      Read
                    </Button>
                    <Tooltip title="Share">
                      <IconButton color="primary" onClick={() => handleShare(article)} aria-label="Share">
                        <Share />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        !error && (
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
            No articles found. Try another keyword.
          </Typography>
        )
      )}
    </Box>
  );
}
