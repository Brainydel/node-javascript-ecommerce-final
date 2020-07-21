import axios from 'axios';
import { apiUrl } from './config.js';
import { getUserInfo } from './localStorage.js';

// Product API
export const getProducts = async ({ searchKeyword = '' }) => {
  try {
    let queryString = '?';
    if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;
    const options = {
      url: `${apiUrl}/api/products${queryString}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(options);
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log('Error in get products', err);
    return { error: err.message };
  }
};
export const getSummary = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/summary`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
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

export const createProduct = async () => {
  const { token } = getUserInfo();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/products`, options);
    const json = await response.json();
    if (response.status !== 201) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in create product', err.message);
    return { error: err.message };
  }
};

export const createReview = async (productId, review) => {
  const { token } = getUserInfo();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  };
  try {
    const response = await fetch(
      `${apiUrl}/api/products/${productId}/reviews`,
      options
    );
    const json = await response.json();
    if (response.status !== 201) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in create review', err.message);
    return { error: err.message };
  }
};

export const uploadProductImage = async (bodyFormData) => {
  const options = {
    method: 'POST',
    body: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/uploads`, options);
    const json = await response.json();
    if (response.status !== 201) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in upload image', err.message);
    return { error: err.message };
  }
};

export const updateProduct = async (product) => {
  const { token } = getUserInfo();
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  };
  try {
    const response = await fetch(
      `${apiUrl}/api/products/${product._id}`,
      options
    );
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in update product', err.message);
    return { error: err.message };
  }
};

export const deleteProduct = async (productId) => {
  const { token } = getUserInfo();
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `${apiUrl}/api/products/${productId}`,
      options
    );
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in delete product', err.message);
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
    console.log('Error in get my orders', err);
    return { error: err.message };
  }
};
export const getOrders = async () => {
  const { token } = getUserInfo();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/orders`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in get orders', err);
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
    console.log('Error in pay order', err.message);
    return { error: err.message };
  }
};
export const deliverOrder = async (orderId) => {
  const { token } = getUserInfo();
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `${apiUrl}/api/orders/${orderId}/deliver`,
      options
    );
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in deliver order', err.message);
    return { error: err.message };
  }
};

export const deleteOrder = async (orderId) => {
  const { token } = getUserInfo();
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/orders/${orderId}`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in delete order', err.message);
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
