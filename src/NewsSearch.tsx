import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  DateRange,
  Event,
  Newspaper,
  Search,
  Today,
  TrendingUp,
  Whatshot,
} from "@mui/icons-material";

{/* 
import {
  Business,
  DateRange,
  Devices,
  Event,
  Info,
  LocalHospital,
  Newspaper,
  Science,
  Search,
  SportsSoccer,
  Theaters,
  Today,
  TrendingUp,
  Whatshot,
} from "@mui/icons-material";
*/}

const NewsSearch: React.FC = () => {
  const todaydate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);
  const startOfWeekdate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay())).toISOString().slice(0, 10);
  const lastWeekStartdate= new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10);
  const startOfMonthdate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
  const lastMonthStartdate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().slice(0, 10);

  console.log("Today's Date:", todaydate);
  console.log("Start of Week Date:", startOfWeekdate);
  console.log("Last Week's Start Date:", lastWeekStartdate);
  console.log("Start of Month Date:", startOfMonthdate);
  console.log("Last Month's Start Date:", lastMonthStartdate);
  
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevancy");
  const [fromdate, setFrom] = useState(todaydate);
  const [articles, setArticles] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const apiKey = "2dc9ba9dbc3d4c399f8111430e170a06";

  useEffect(() => {
    fetchArticles("top");
  }, []);

  const fetchArticles = async (searchQuery: string) => {
    try {
      if (searchQuery.trim() !== "") {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromdate}&sortBy=${sortBy}&apiKey=${apiKey}`
        );
        const data = await response.json();
        setArticles(data.articles);
        setResults(data.totalResults);
      }
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    fetchArticles(query);
  };

  function refreshSearch() {
    fetchArticles(query);
  }

  return (
    <Stack gap={3} padding={"30px"}>
      <Stack
        direction={"row"}
        gap={2}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Stack direction={"row"}>
          <TextField
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" onClick={handleSearch} variant="contained">
            <Search />
          </Button>
        </Stack>

        <Select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            refreshSearch();
          }}
        >
          <MenuItem value="relevancy" sx={{ display: "flex", gap: 4 }}>
            <TrendingUp sx={{ verticalAlign: "middle", color: "#2196f3" }} />{" "}
            Hot
          </MenuItem>
          <MenuItem value="popularity" sx={{ display: "flex", gap: 4 }}>
            <Whatshot sx={{ verticalAlign: "middle", color: "#f50057" }} /> Top
          </MenuItem>
          <MenuItem value="publishedAt" sx={{ display: "flex", gap: 4 }}>
            <Newspaper sx={{ verticalAlign: "middle", color: "#4caf50" }} /> New
          </MenuItem>
        </Select>

        <Select 
          value={fromdate}
          onChange={(e) => {
            setFrom(e.target.value);
            refreshSearch();
          }}>
          <MenuItem value={todaydate} sx={{ display: "flex", gap: 4 }}>
            <Today sx={{ verticalAlign: "middle", color: "#2196f3" }} />{" "}
            Today
          </MenuItem>
          <MenuItem value={startOfWeekdate} sx={{ display: "flex", gap: 4 }}>
            <DateRange sx={{ verticalAlign: "middle", color: "#f50057" }} />{" "}
            This Week
          </MenuItem>
          <MenuItem value={lastWeekStartdate} sx={{ display: "flex", gap: 4 }}>
            <DateRange sx={{ verticalAlign: "middle", color: "#f50057" }} /> 
            Last Week
          </MenuItem>
          <MenuItem value={startOfMonthdate} sx={{ display: "flex", gap: 4 }}>
            <Event sx={{ verticalAlign: "middle", color: "#ff9800" }} />{" "}
            This Month
          </MenuItem>
          <MenuItem value={lastMonthStartdate} sx={{ display: "flex", gap: 4 }}>
            <Event sx={{ verticalAlign: "middle", color: "#ff9800" }} />{" "}
            Last Month
          </MenuItem>
        </Select>

        {/* 
        <Select>
          <MenuItem value="business" sx={{ display: "flex", gap: 4 }}>
            <Business sx={{ verticalAlign: "middle", color: "#2196f3" }} />{" "}
            business
          </MenuItem>
          <MenuItem value="entertainment" sx={{ display: "flex", gap: 4 }}>
            <Theaters sx={{ verticalAlign: "middle", color: "#f50057" }} />{" "}
            entertainment
          </MenuItem>
          <MenuItem value="general" sx={{ display: "flex", gap: 4 }}>
            <Info sx={{ verticalAlign: "middle", color: "#4caf50" }} /> general
          </MenuItem>
          <MenuItem value="health" sx={{ display: "flex", gap: 4 }}>
            <LocalHospital sx={{ verticalAlign: "middle", color: "#ff9800" }} />{" "}
            health
          </MenuItem>
          <MenuItem value="science" sx={{ display: "flex", gap: 4 }}>
            <Science sx={{ verticalAlign: "middle", color: "#ff5722" }} />{" "}
            science
          </MenuItem>
          <MenuItem value="sports" sx={{ display: "flex", gap: 4 }}>
            <SportsSoccer sx={{ verticalAlign: "middle", color: "#9c27b0" }} />{" "}
            sports
          </MenuItem>
          <MenuItem value="technology" sx={{ display: "flex", gap: 4 }}>
            <Devices sx={{ verticalAlign: "middle", color: "#795548" }} />{" "}
            technology
          </MenuItem>
        </Select>
        */}
      </Stack>

      <Typography>Results : {results}</Typography>

      <Stack
        gap={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {articles.map((article, index) => (
          <Card key={index} sx={{ width: 300, marginRight: "auto"}}>
            <CardMedia
              sx={{ height: 200 }}
              image={article.urlToImage}
            ></CardMedia>
            <CardContent>
              <Typography variant="body1">{article.title}</Typography>
              <Typography variant="caption">{article.description}</Typography>
            </CardContent>
            <CardActions>
              <Button href={article.url} target="_blank">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default NewsSearch;
