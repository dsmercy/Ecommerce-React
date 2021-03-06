import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import Catalog from '../features/catalog/Catalog';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import AboutPage from '../features/about/AboutPage';
import ProductDetails from '../features/catalog/ProductDetails';
import ContactPage from '../features/contact/ContactPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import BasketPage from '../features/basket/BasketPage';
import LoadingComponent from './LoadingComponent';
import CheckoutPage from '../features/checkout/CheckoutPage';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../features/basket/basketSlice';
import Login from '../features/account/Login';
import Register from '../features/account/Register';
import { fetchCurrentUser } from '../features/account/accountSlice';
import PrivateRoute from './PrivateRoute';
import Orders from '../features/orders/Orders';


function App() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
  
    const initApp = useCallback(async () => {
      try {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchBasketAsync());
      } catch (error) {
        console.log(error);
      }
    }, [dispatch])
  
    useEffect(() => {
      initApp().then(() => setLoading(false));
    }, [initApp])

    const [darkMode, setDarkMode] = useState(true);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  if (loading) return <LoadingComponent message='Initialising app...' />

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage} />
          <PrivateRoute path='/checkout' component={CheckoutPage} />
          <PrivateRoute path='/orders' component={Orders} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
