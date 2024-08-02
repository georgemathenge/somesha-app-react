import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        color: (theme) =>
          theme.palette.mode === "light" ? "primary.light" : "primary.light",
        backgroundColor: "rgba(4, 6, 7, 0.8)",
      }}
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
        <Grid container>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={"bold"}>
              Company
            </Typography>
            <Typography>
              <Typography>Home</Typography>
              <Typography>Features</Typography>
              <Typography>FAQs</Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={"bold"}>
              Links
            </Typography>
            <Typography>Privacy</Typography>
            <Typography>Policy</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={"bold"}>
              Contact Us
            </Typography>
            <Typography>Email: example@com</Typography>
            <Typography>Tel : 1978376328</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
