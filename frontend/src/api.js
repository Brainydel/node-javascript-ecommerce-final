import { apiUrl } from './config.js';
import { getUserInfo } from './localStorage.js';
import { hideLoading } from './utils.js';

// Product API
export const getProducts = async ({ searchKeyword = '' }) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let queryString = '?';
    if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;
    const response = await fetch(
      `${apiUrl}/api/products${queryString}`,
      options
    );
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in get products', err);
    return { error: err.message };
  }
};
export const getProduct = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/products/${id}`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in get product', err);
    return { error: err.message };
  }
};

// Order API
export const getOrder = async (id) => {
  const { token } = getUserInfo();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/orders/${id}`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in get order', err);
    return { error: err.message };
  }
};
export const getMyOrders = async () => {
  const { token } = getUserInfo();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/orders/mine`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in get order', err);
    hideLoading();
    return { error: err.message };
  }
};
export const createOrder = async (order) => {
  const { token } = getUserInfo();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  };
  try {
    const response = await fetch(`${apiUrl}/api/orders`, options);
    const json = await response.json();
    if (response.status !== 201) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in create order', err.message);
    return { error: err.message };
  }
};
export const payOrder = async (orderId, paymentResult) => {
  const { token } = getUserInfo();
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentResult),
  };
  try {
    const response = await fetch(
      `${apiUrl}/api/orders/${orderId}/pay`,
      options
    );
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in create order', err.message);
    return { error: err.message };
  }
};

// User API
export const signin = async ({ email, password }) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(`${apiUrl}/api/users/signin`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in signin', err.message);
    return { error: err.message };
  }
};
export const register = async ({ name, email, password }) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  };
  try {
    const response = await fetch(`${apiUrl}/api/users/register`, options);
    const json = await response.json();
    if (response.status !== 201) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in register', err.message);
    return { error: err.message };
  }
};
export const update = async ({ name, email, password }) => {
  const { _id: userId, token } = getUserInfo();
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, password }),
  };
  try {
    const response = await fetch(`${apiUrl}/api/users/${userId}`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in update user', err.message);
    return { error: err.message };
  }
};

// Paypal
export const getPaypalClientID = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/paypal/clientId`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json.clientId;
  } catch (err) {
    console.log('Error in get client id', err);
    return { error: err.message };
  }
};
