import { useEffect, useState } from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewStory = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const { storyId } = useParams();
console.log(storyId)
    useEffect(() => {
      const fetchData = async () => {
        
        try {
          // Replace this URL with your actual API endpoint
          const response = await axios.get(
            `http://localhost:4000/api/v1/somesha/app/get/stories/${storyId}`
          );
          setData(response.data.data);// Adjust based on your API structure
     setStatus(response.data.status)
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [storyId]);

  return (
    <Box
      id=""
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 80%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 10 },
          pb: { xs: 5, sm: 5 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            Featured &nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              stories
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Here are our featured stories
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          ></Stack>
        </Stack>
      </Container>
      <Container>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {status !== 230 && <div>No stories Found</div>}

        {!loading &&
          !error &&
          status ===
            230 &&(
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 1 }}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <>
                    <Typography variant="h6">{data.title}</Typography>
                    <Typography variant="h7">{data.category}</Typography>
                    <Typography variant="body2">{data.description}</Typography>
                  </>
                </Grid>
                {/* <Grid item xs={1} sm={2} md={6}>
              <>
                <Typography variant="h6">{data.title}</Typography>
                <Typography variant="h7">{data.category}</Typography>
                <Typography variant="body2">{data.description}</Typography>
              </>
            </Grid> */}
              </Grid>
            )}
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 10, sm: 5 },
          pb: { xs: 5, sm: 5 },
        }}
      >
        <Button variant="contained" size="small">
          Share
        </Button>
      </Container>
    </Box>
  );
};

export default ViewStory;
