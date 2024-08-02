import './App.css';
import ViewStory from './components/ViewStory';
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Root from './Root';
import NewStory from './components/NewStory';
import Stories from './components/Stories';

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'dark'
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

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
