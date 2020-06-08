import Utils from '../utils.js';
import { apiUrl } from '../config.js';
let getProduct = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`${apiUrl}/api/products/${id}`, options);
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

let ProductShow = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let product = await getProduct(request.id);

    return `
            <section class="section">
                <h1> Product Id : ${product._id}</h1>
                <p> Product Title : ${product.name} </p>
                <p> Product Content : ${product.description} </p>
                <p> Product Author : ${product.brand} </p>
            </section>
        `;
  },
  after_render: async () => {},
};

export default ProductShow;
