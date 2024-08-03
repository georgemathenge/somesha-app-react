import { useEffect, useState } from "react";
import React from "react";
import { Box, Container, Typography, Modal } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BASEURL } from "./api-service.js";

const Stories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const new_story = [
    {
      title: "My preferments ",
      desc: "Add A new story from your recent preferences",
      link: "user-preference",
    },
    {
      title: "New preferment",
      desc: "Add A new story from a new preference",
      link: "create-new",
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "block",
    alignItems:"center",
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
    <Container sx={{ width: "70%" }}>
      <Box
        sx={{
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 10 },
          pb: { xs: 5, sm: 5 },
        }}
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
          {/* <Link to={`/create-new`}> */}
          <Button onClick={handleOpen}>
            {" "}
            <AddIcon></AddIcon> Add New
          </Button>
          {/* </Link> */}
        </Box>
        <Container>
          {loading && <div> Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {!loading && !error && (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            >
              {data.map((story) => (
                <Grid item xs={12} sm={6} md={4} key={story.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
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
                      <Link to={`/view-story/${story.id}`}>
                        <Button>View More</Button>
                      </Link>
                    </CardActions>
                  </Card>
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
            <Typography id="modal-modal-title" variant="h5" component="h5">
              New Story
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            >
              {new_story.map((story) => (
                <Grid item xs={12} sm={6} md={6} key={story.id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      m: { xs: 1, sm: 0 },
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        {story.title}
                      </Typography>
                      <Typography variant="body3" color="text.secondary">
                        {story.desc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/${story.link}`}>
                        <Button>Use {story.title}</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Modal>
        {/* <NewStory></NewStory> */}
      </Box>
    </Container>
  );
};

export default Stories;
