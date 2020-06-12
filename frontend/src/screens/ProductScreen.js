import { parseRequestURL } from '../utils.js';
import { getProduct } from '../api.js';
import Rating from '../components/Rating.js';

let ProductScreen = {
  render: async () => {
    let request = parseRequestURL();
    let product = await getProduct(request.id);

    return `
<div>
    <div class="back-to-result">
      <a href="/#">Back to result</a>
    </div>
    <div class="details">
            <div class="details-image">
              <img src="${product.image}" alt="product" ></img>
            </div>
            <div class="details-info">
              <ul>
                <li>
                  <h1>${product.name}</h1>
                </li>
                <li>
                ${Rating.render({
                  value: product.rating,
                  text: `${product.numReviews} reviews`,
                })}
                </li>
                <li>
                  Price: <b>$${product.price}</b>
                </li>
                <li>
                  Description:
                  <div>
                    ${product.description}
                  </div>
                </li>
              </ul>
            </div>
            <div class="details-action">
              <ul>
                <li>
                  Price: ${product.price}
                </li>
                <li>
                  Status: ${
                    product.countInStock > 0 ? 'In Stock' : 'Unavailable.'
                  }
                </li>              
                <li>
                <button
                id="add_to_cart_btn"
                class="button primary"
                >
                Add to Cart
                </button>
                </li>
              </ul>
            </div>
          </div>
        `;
  },
  after_render: async () => {
    let request = parseRequestURL();
    document.getElementById('add_to_cart_btn').addEventListener('click', () => {
      document.location.hash = '/cart/' + request.id;
    });
  },
};

export default ProductScreen;
