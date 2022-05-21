import { useState } from 'react';
import './styles.css';
import Catalog from '../features/catalog/Catalog';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import AboutPage from '../features/about/AboutPage';
import ProductDetails from '../features/catalog/ProductDetails';
import ContactPage from '../features/contact/ContactPage';


function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType  = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Route exact path='/' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/contact' component={ContactPage} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
