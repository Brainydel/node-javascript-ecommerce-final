import { apiUrl } from './config.js';
import { getUserInfo } from './localStorage.js';

export const getProducts = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/products`, options);
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error getting products', err);
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
    console.log('Error getting product', err);
    return { error: err.message };
  }
};

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
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in signin', err.message);
    return { error: err.message };
  }
};

export const update = async ({ userId, name, email, password }) => {
  const { token } = getUserInfo();
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
    console.log('Error in signin', err.message);
    return { error: err.message };
  }
};
