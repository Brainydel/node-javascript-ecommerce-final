import { apiUrl } from '../config.js';
let getPostsList = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/products`, options);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

let HomeScreen = {
  render: async () => {
    let products = await getPostsList();
    if (!products.length) {
      return `<div>No product found.</div>`;
    }
    let view = `
    <ul class="products">
            ${products
              .map(
                (product) =>
                  `<li key=${product._id}>
                <div class="product">
                  <a href="#/product/${product._id}">
                    <img class="product-image" src="${product.image}" alt="${product.name}" />

                  </a>
                  <div class="product-name">
                    <a href="#/product/${product._id}">${product.name}</a>
                  </div>
                  <div class="product-brand">${product.brand}</div>
                  <div class="product-price">$${product.price}</div>
                  <div class="product-rating">${product.rating} Stars (${product.numReiews} Reviews)</div>
                </div>
              </li>`
              )
              .join('\n ')}
        </ul>
        `;
    return view;
  },
  after_render: async () => {},
};

export default HomeScreen;
