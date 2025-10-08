import { useEffect, useState, useRef } from "react";
import { axoinstance } from "../AxiosInstance/AxiosInstance";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { Share, Visibility, BookmarkAdd } from "@mui/icons-material";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("apple");
  const [filtered, setFiltered] = useState([]);
  const searchRef = useRef(null);

  // Fetch articles
  const fetchArticles = (topic) => {
    axoinstance
      .get("/everything", {
        params: { q: topic, language: "en", pageSize: 20 },
      })
      .then((res) => setArticles(res.data.articles || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchArticles(query);
  }, [ query ]);

  useEffect(() => {
    const results = articles.filter((a) =>
      a.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  }, [query, articles]);

  // Share article
  const handleShare = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(article.url);
      alert("Link copied to clipboard!");
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFiltered([]); // close list
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        📰 News Explorer
      </Typography>

      {/* Search Box */}
      <Box
        ref={searchRef}
        sx={{ position: "relative", mb: 5, display: "flex", justifyContent: "center" }}
      >
        <TextField
          variant="outlined"
          label="Search Topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: { xs: "90%", sm: 400 }, backgroundColor: "white", borderRadius: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchArticles(query);
          }}
        />

        {query && filtered.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "4px",
              border: "1px solid #ccc",
              width: "400px",
              maxHeight: "250px",
              overflowY: "auto",
              backgroundColor: "#fff",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              position: "absolute",
              zIndex: 10,
            }}
          >
            {filtered.map((item, i) => (
              <li
                key={i}
                style={{
                  padding: "10px 12px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setQuery(item.title.split(" ")[0]);
                  setFiltered([]);
                  fetchArticles(item.title.split(" ")[0]);
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </Box>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {articles.map((article, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={i}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 280,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  },
                  backgroundColor: "#fff",
                }}
              >
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={article.urlToImage}
                    alt={article.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.description || "No description available."}
                  </Typography>

                  {/* Actions */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      startIcon={<Visibility />}
                    >
                      View
                    </Button>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Share">
                        <IconButton color="primary" onClick={() => handleShare(article)}>
                          <Share />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Save for later">
                        <IconButton color="secondary">
                          <BookmarkAdd />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          No articles found. Try another keyword.
        </Typography>
      )}
    </Box>
  );
}
