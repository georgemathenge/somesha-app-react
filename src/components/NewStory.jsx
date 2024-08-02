import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  TextField,
  Backdrop,
  Grid,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { genres, steps, mainCharacters } from "../data";
import { BASEURL } from "./api-service.js";

function NewStory() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // const [age, setAge] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    preferredName: "",
    gender: "",
    age: "",
    favouriteGenre: "",
    favouriteSubGenre: "",
    favouriteTheme: "",
    preferredMainCharacter: "",
    preferredReadingLevel: "",
    favouriteSetting: "",
    timePeriodPreference: "",
    accessibilityNeeds: "",
    preferredStoryLength: "",
    preferredLanguage: "",
    culturalPreference: "",
  });

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      fullName: "",
      preferredName: "",
      gender: "",
      age: "",
      favouriteGenre: "",
      favouriteSubGenre: "",
      favouriteTheme: "",
      preferredReadingLevel: "",
      preferredMainCharacter: "",
      favouriteSetting: "",
      timePeriodPreference: "",
      accessibilityNeeds: "",
      preferredStoryLength: "",
      preferredLanguage: "",
      culturalPreference: "",
    });
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      if (name === "favouriteGenre") {
        return {
          ...prevFormData,
          [name]: value,
          favouriteSubGenre: "", // Reset sub-genre
          favouriteTheme: "", // Reset theme
        };
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  //  const [filteredGenres, setFilteredGenres] = useState(genres);

  //  const handleAgeChange = (event) => {
  //    const newAge = event.target.value;
  //    setAge(newAge);

  //    // Filter genres based on age
  //    const newFilteredGenres = {};
  //    for (const [genre, subGenres] of Object.entries(genres)) {
  //      newFilteredGenres[genre] = {};
  //      for (const [subGenre, themes] of Object.entries(subGenres)) {
  //        if (newAge >= 0 && newAge <= 10 && subGenre === "Horror") {
  //          continue; // Exclude restricted sub-genres
  //        }
  //        newFilteredGenres[genre][subGenre] = themes;
  //      }
  //    }

  //    setFilteredGenres(newFilteredGenres);
  //    // Reset formData when age changes
  //    setFormData({
  //      favouriteGenre: "",
  //      favouriteSubGenre: "",
  //      favouriteTheme: "",
  //    });
  //  };

  const validateStep = () => {
    let newErrors = {};

    if (activeStep === 0) {
      if (!formData.fullName) {
        newErrors.name = "Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
        newErrors.name = "Name must contain only alphabetic characters";
      }
      if (!formData.preferredName) {
        newErrors.preferredName = "Preferred Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(formData.preferredName)) {
        newErrors.preferredName =
          "Preferred Name must contain only alphabetic characters";
      }
      if (!formData.age) {
        newErrors.age = "Age is required";
      } else if (isNaN(formData.age)) {
        newErrors.age = "Age must be a number";
      }
    } else if (activeStep === 1) {
      if (!formData.favouriteGenre) {
        newErrors.genre = "Please Select a Genre";
      }
      if (!formData.favouriteSubGenre) {
        newErrors.subGenre = "Please Select a Sub Genre";
      }
      if (!formData.favouriteTheme) {
        newErrors.theme = "Please Select a theme";
      }
    } else if (activeStep === 2) {
      if (!/^[A-Za-z\s]+$/.test(formData.preferredMainCharacter)) {
        newErrors.preferredMainCharacter =
          "Preferred Main Name must contain only alphabetic characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const isStepOptional = (step) => {
    // Define your logic for optional steps here
    return step === 1;
  };

  const isStepSkipped = (step) => {
    // Define your logic for skipped steps here
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(false);
    setLoading(true); // Set loading state to false when the request completes

    axios
      .post(` ${BASEURL}/api/v1/query/gemini/ai`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        setFormVisible(false);
        setSubmitted(true);
        setResponseData(response.data.story);
        setResponseStatus(response.status);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <TextField
              name="fullName"
              label="Full Names *"
              variant="outlined"
              fullWidth
              type="text"
              margin="normal"
              value={formData.fullName}
              onChange={handleChange}
              className="custom-textfield"
              helperText={errors.name}
              error={Boolean(errors.name)}
            />
            <TextField
              name="preferredName"
              label="Preferred Name *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.preferredName}
              onChange={handleChange}
              className="custom-textfield"
              helperText={errors.preferredName}
              error={Boolean(errors.preferredName)}
            />
            <TextField
              name="age"
              label="Age *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.age}
              className="custom-textfield"
              onChange={handleChange}
              helperText={errors.age}
              error={Boolean(errors.age)}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                name="gender"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value={"male"}>Male </MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </form>
        );
      case 1:
        return (
          <form>
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(errors.genre)}
            >
              <InputLabel id="genre-label">Favourite Genre *</InputLabel>
              <Select
                name="favouriteGenre"
                labelId="genre-label"
                value={formData.favouriteGenre}
                onChange={handleChange}
                label="Genre"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.keys(genres).map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
              {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
            </FormControl>

            {formData.favouriteGenre && (
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(errors.subGenre)}
              >
                <InputLabel id="subgenre-label">
                  Favourite SubGenre *
                </InputLabel>
                <Select
                  name="favouriteSubGenre"
                  labelId="subgenre-label"
                  value={formData.favouriteSubGenre}
                  // onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e); // To update formData with selected sub-genre
                  }}
                  label="Favourite SubGenre"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(genres[formData.favouriteGenre] || {}).map(
                    (subGenre) => (
                      <MenuItem key={subGenre} value={subGenre}>
                        {subGenre}
                      </MenuItem>
                    )
                  )}
                </Select>
                {errors.subGenre && (
                  <FormHelperText>{errors.subGenre}</FormHelperText>
                )}
              </FormControl>
            )}

            {formData.favouriteSubGenre && (
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(errors.theme)}
              >
                <InputLabel id="theme-label">Themes *</InputLabel>
                <Select
                  name="favouriteTheme"
                  labelId="theme-label"
                  value={formData.favouriteTheme || ""}
                  onChange={handleChange}
                  label="Themes"
                  helperText={errors.theme}
                  error={Boolean(errors.theme)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {genres[formData.favouriteGenre][
                    formData.favouriteSubGenre
                  ].map((theme) => (
                    <MenuItem key={theme} value={theme}>
                      {theme}
                    </MenuItem>
                  ))}
                </Select>
                {errors.theme && (
                  <FormHelperText>{errors.theme}</FormHelperText>
                )}
              </FormControl>
            )}
            <TextField
              id="readingLevel"
              name="preferredReadingLevel"
              label="Preferred Reading Level"
              select
              value={formData.preferredReadingLevel}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>Select a level</em>
              </MenuItem>
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </TextField>
          </form>
        );
      case 2:
        return (
          <form>
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(errors.genre)}
            >
              <InputLabel id="genre-label">
                Main Character Preference *
              </InputLabel>
              <Select
                name="preferredMainCharacter"
                labelId="genre-label"
                value={formData.preferredMainCharacter}
                onChange={handleChange}
                label="Main Character Preference"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.keys(mainCharacters).map((mainChar) => (
                  <MenuItem key={mainChar} value={mainChar}>
                    {mainChar}
                  </MenuItem>
                ))}
              </Select>
              {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
            </FormControl>
            {formData.preferredMainCharacter && (
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(errors.preferred)}
              >
                <InputLabel id="subgenre-label">Favourite Setting *</InputLabel>
                <Select
                  name="favouriteSetting"
                  labelId="subgenre-label"
                  value={formData.favouriteSetting}
                  // onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e); // To update formData with selected sub-genre
                  }}
                  label="Favourite Setting"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {mainCharacters[formData.preferredMainCharacter].map((theme) => (
                    <MenuItem key={theme} value={theme}>
                      {theme}
                    </MenuItem>
                  ))}
                </Select>
                {errors.subGenre && (
                  <FormHelperText>{errors.subGenre}</FormHelperText>
                )}
              </FormControl>
            )}

            {/* <TextField
              name="preferredMainCharacter"
              label="Main Character Preference"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.preferredMainCharacter}
              onChange={handleChange}
              className="custom-textfield"
              helperText={errors.preferredMainCharacter}
              error={Boolean(errors.preferredMainCharacter)}
            /> */}
          </form>
        );
        return (
          <form>
            <TextField
              name="favouriteSetting"
              label="Favourite Setting"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.favouriteSetting}
              onChange={handleChange}
              className="custom-textfield"
            />
            <TextField
              name="timePeriodPreference"
              label="Time Period Preference"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.timePeriodPreference}
              onChange={handleChange}
              className="custom-textfield"
            />
          </form>
        );
      case 3:
        return (
          <form>
            <TextField
              name="accessibilityNeeds"
              label="Accessibility Needs"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.accessibilityNeeds}
              onChange={handleChange}
              className="custom-textfield"
            />
            <TextField
              name="preferredStoryLength"
              label="Preferred Story Length "
              variant="outlined"
              fullWidth
              type="number"
              margin="normal"
              value={formData.preferredStoryLength}
              onChange={handleChange}
              className="custom-textfield"
            />
          </form>
        );
      case 4:
        return (
          <form>
            <TextField
              name="preferredLanguage"
              label="Language"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.preferredLanguage}
              onChange={handleChange}
              className="custom-textfield"
            />
          </form>
        );

      default:
        return "Unknown step";
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center",
              pt: { xs: 14, sm: 10 },
              pb: { xs: 5, sm: 5 },
            }}
          >
            <Typography variant="h4" sx={{ pb: { sm: 3 } }}>
              Let us create you that story
            </Typography>
            {formVisible && (
              <Container
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid #999999",
                  boxShadow: 10,
                }}
              >
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                      );
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                      <Button
                        disabled={submitted}
                        onClick={handleSubmit}
                        sx={{ ml: 1 }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Step {activeStep + 1}
                    </Typography>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}
                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Container>
            )}
            <div>
              {loading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : responseStatus === 200 ? (
                <div>
                  <Typography variant="h5">Here is your story:</Typography>
                  <Box>
                    {responseData?.title ? (
                      <Typography variant="h6">
                        {" "}
                        Title: {responseData.title}
                      </Typography>
                    ) : (
                      <Typography variant="h6">Title not available</Typography>
                    )}
                    {responseData?.story ? (
                      <Container>{responseData.story}</Container>
                    ) : (
                      <Typography variant="body1">
                        Story content not available
                      </Typography>
                    )}{" "}
                    {responseData?.questions ? (
                      <Box>
                        <Typography variant="h7">Questions</Typography>
                        <Container>{responseData.questions}</Container>
                      </Box>
                    ) : (
                      <Typography variant="body1">
                        Story questions not available
                      </Typography>
                    )}
                  </Box>
                  <Button>Submit</Button>
                </div>
              ) : responseStatus === 400 || responseStatus === 500 ? (
                <div>
                  <Typography variant="body2">
                    An error occurred while generating your story. Status code:
                    {responseStatus}
                  </Typography>
                </div>
              ) : (
                ""
              )}
            </div>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default NewStory;
