import { useEffect, useState } from "react";
import React from "react";
import { Box, Container, Typography, Modal, Grid, Card, CardActions, CardContent, CardMedia, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BASEURL } from "./api-service.js";
import { alpha } from "@mui/material";

const Stories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const new_story = [
    {
      id: 1, // Add an ID for mapping
      title: "My preferments",
      desc: "Add a new story from your recent preference",
      link: "user-preference",
      bgcolor: "#F08080",
    },
    {
      id: 2, // Add an ID for mapping
      title: "New preferment",
      desc: "Add a new story from a new preference",
      link: "create-new",
      bgcolor: "#808000",
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "block",
    alignItems: "center",
    pt: { xs: 2, sm: 10 },
    transform: "translate(-50%, -50%)",
    width: '100vh',
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 20,
    p: 4,
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await axios.get(
          `${BASEURL}/api/v1/somesha/app/get/stories`
        );
        setData(response.data.data); // Adjust based on your API structure
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box  sx={(theme) =>({
      width:"100%",
      backgroundImage:
      theme.palette.mode === "light"
        ? "linear-gradient(180deg, #CEE5FD, #FFF)"
        : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
    })}>
      <Container
        sx={(theme) =>({
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 10 },
          pb: { xs: 5, sm: 5 },
          backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        })}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: { xs: 5, sm: 5 },
          }}
        >
          <Typography variant="h6">Find your stories Here</Typography>
          <Button onClick={handleOpen}>
            <AddIcon /> Add New
          </Button>
        </Box>
        <Container>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {!loading && !error && (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
              {data.map((story) => (
                <Grid item xs={12} sm={6} md={4} key={story.id}>
                  <Link to={`/view-story/${story.id}`} style={{ textDecoration: "none", display: "block" }}>
                    <Card sx={{ 
                      maxWidth: 345, 
                      "&:hover": {
                        boxShadow: 6,
                        transform: "scale(1.05)"
                      }
                    }}>
                      <CardMedia
                        component="img"
                        alt={story.title}
                        height="200"
                        image="/story6.jpeg"
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {story.title}
                        </Typography>
                        <Typography variant="h8" color="text.secondary">
                          {story.category}
                        </Typography>
                        <Typography variant="body2" noWrap color="text.secondary">
                          {story.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button sx={{ color: "white" }}>View More</Button>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h5"
              sx={{ 
                textAlign: "center",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "black"
                    : "white",
                pb: { xs: 5, sm: 5 },
              }}
            >
              New Story
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
              {new_story.map((story) => (
                <Grid item xs={12} sm={6} md={6} key={story.id}>
                  <Link to={`/${story.link}`} style={{ textDecoration: "none", display: "block" }}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        m: { xs: 1, sm: 0 },
                        bgcolor: story.bgcolor,
                        "&:hover": {
                          boxShadow: 6,
                          transform: "scale(1.05)"
                        }
                      }}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h7" component="div" sx={{ color: "white", fontSize: "1rem" }}>
                          {story.title}
                        </Typography>
                        <Typography variant="body3" sx={{ color: "white", fontSize: "0.875rem" }}>
                          {story.desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button sx={{ color: "white" }}>Use {story.title}</Button>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Stories;
