import { apiUrl } from './config.js';
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
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};
export const signin = async (email, password) => {
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
