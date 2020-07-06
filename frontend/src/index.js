import HomeScreen from './screens/HomeScreen.js';
import AboutScreen from './screens/AboutScreen.js';
import CartScreen from './screens/CartScreen.js';
import Error404 from './screens/Error404.js';
import ProductScreen from './screens/ProductScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import { parseRequestUrl, showLoading, hideLoading } from './utils.js';
import SigninScreen from './screens/SigninScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import Aside from './components/Aside.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';
import DashboardScreen from './screens/DashboardScreen.js';

// List of all routes.s
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
  '/product/:id/edit': ProductEditScreen,
  '/productlist': ProductListScreen,
  '/orderlist': OrderListScreen,
  '/dashboard': DashboardScreen,
  '/order/:id': OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
};

// Takes a URL, checks against the list of supported routes and then renders the corresponding main page.
const router = async () => {
  showLoading();
  // Lazy load view element:
  const header = document.getElementById('header_container');
  const aside = document.getElementById('aside_container');
  const main = document.getElementById('main_container');
  const footer = document.getElementById('footer_container');

  // Render the Header and footer of the page
  header.innerHTML = await Header.render();
  await Header.after_render();
  aside.innerHTML = await Aside.render();
  await Aside.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // Get the parsed URl from the addressbar
  const request = parseRequestUrl();

  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const screen = routes[parsedUrl] ? routes[parsedUrl] : Error404;
  main.innerHTML = await screen.render();
  await screen.after_render();
  hideLoading();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
