import HomeScreen from './screens/HomeScreen.js';
import AboutScreen from './screens/AboutScreen.js';
import CartScreen from './screens/CartScreen.js';
import Error404 from './screens/Error404.js';
import ProductScreen from './screens/ProductScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import { parseRequestURL, showLoading, hideLoading } from './utils.js';
import SigninScreen from './screens/SigninScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';

// List of all routes.
const routes = {
  '/': HomeScreen,
  '/about': AboutScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
};

// Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  showLoading();
  // Lazy load view element:
  const header = document.getElementById('header_container');
  const content = document.getElementById('content_container');
  const footer = document.getElementById('footer_container');

  // Render the Header and footer of the page
  header.innerHTML = await Header.render();
  await Header.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // Get the parsed URl from the addressbar
  const request = parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const screen = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await screen.render();
  await screen.after_render();
  hideLoading();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
