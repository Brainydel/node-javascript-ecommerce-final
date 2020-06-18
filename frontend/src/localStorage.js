export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { name: '', email: '', password: '' };
  return userInfo;
};
export const cleanUser = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shipping');
  localStorage.removeItem('payment');
};

export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  password = '',
  isAdmin = false,
  token = '',
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ _id, name, email, password, isAdmin, token })
  );
};
export const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  return cartItems;
};
export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
export const getShipping = () => {
  const cartItems = localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : { city: '', country: '', address: '', postalCode: '' };
  return cartItems;
};
export const cleanCart = () => {
  localStorage.removeItem('cartItems');
};
export const setShipping = ({
  address = '',
  city = '',
  country = '',
  postalCode = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify({ address, city, postalCode, country })
  );
};

export const getPayment = () => {
  const cartItems = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : { paymentMethod: 'paypal' };
  return cartItems;
};
export const setPayment = ({ paymentMethod = 'paypal' }) => {
  localStorage.setItem('payment', JSON.stringify({ paymentMethod }));
};
