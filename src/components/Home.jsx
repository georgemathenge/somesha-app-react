import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FeaturedStories from "./FeaturedStories";
function Home() {
  return (
    <Box>
      <Box
        id="hero"
        sx={{
          width: "100%",
          height: "100vh", // Adjust the height as needed
          backgroundImage: `url(${"/hero2.jpg"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay color and opacity as needed
            zIndex: 1,
          }}
        />
        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "80%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                fontSize: "clamp(3.5rem, 10vw, 4rem)",
                pt: { xs: 10, sm: 10, md:10 },

              }}
            >
              Welcome to Somesha &nbsp;
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
                with AI
              </Typography>
            </Typography>
            <Typography variant="h6"
              textAlign="center"
              color="text.primary"
              sx={{
                alignSelf: "center",
                width: { sm: "100%",
                   md: "80%", 
                 },
                 fontSize:"20",
                 pt: { xs: 10, sm: 5, md:5 },
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.light"
                    : "primary.light",
              }}
            >
         
    Our application is designed to support early childhood development with a focus on numeracy and comprehension skills. <br/><br/>
    Targeting young learners, the app provides engaging and interactive educational content tailored to enhance foundational skills in a fun and immersive way. <br/><br/>
    By leveraging the power of artificial intelligence, the application offers personalized learning experiences that adapt to each child's unique needs and learning pace.<br/><br/>

            </Typography>
            {/* <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
            >
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autoComplete: "off",
                  "aria-label": "Enter your email address",
                }}
              />
              <Button variant="contained" color="primary">
                Start now
              </Button>
            </Stack>
            <Typography
              variant="caption"
              textAlign="center"
              sx={{ opacity: 0.8 }}
            >
              By clicking &quot;Start now&quot; you agree to our&nbsp;
              <Link href="#" color="primary">
                Terms & Conditions
              </Link>
              .
            </Typography> */}
          </Stack>
        </Container>
      </Box>

      <FeaturedStories />
    </Box>
  );
}

export default Home;
