import React, { useState } from 'react';
import './App.css';
import ViewStory from './components/ViewStory';
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Root from './Root';
import NewStory from './components/NewStory';
import Stories from './components/Stories';

const getTheme = (mode) => createTheme({
  palette: {
    mode: mode, // 'light' or 'dark'
    primary: {
      main: '#86B6F6', // Customize your primary color
      light: '#CED5DC', // Customize your primary light color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"  element={<Root />}>
      <Route index element={<Home />} />
      <Route path='/create-new' element={<NewStory />} />
      <Route path="/view-story/:storyId" element={<ViewStory />} />
      <Route path='/stories' element={<Stories />} />
    </Route>
  )
);

function App() {
  const [mode, setMode] = useState('light');

  const theme = getTheme(mode);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </div>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
