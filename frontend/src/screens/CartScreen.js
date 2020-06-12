import { rerender, parseRequestURL } from '../utils.js';
import { getProduct } from '../api.js';
let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
const addToCart = (item, force = false) => {
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (force) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  if (force) {
    rerender(CartScreen);
  }
};
const removeFromCart = (id) => {
  console.log('removeFromCart', id);
  cartItems = cartItems.filter((x) => x.product !== id);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  if (id === parseRequestURL().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
};
const CartScreen = {
  after_render: async () => {
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = cartItems.find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', (e) => {
        removeFromCart(deleteButton.id);
      });
    });
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', (e) => {
      document.location.hash = '/signin';
    });
  },
  render: async () => {
    const request = parseRequestURL();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    return `
    <div class="cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3> Shopping Cart </h3>
            <div>
            Price
            </div>
        </li>
        ${
          cartItems.length === 0
            ? `<div>Cart is empty. <a href="/#/">Go Shopping</a></div>`
            : cartItems
                .map(
                  (item) =>
                    `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="${'/#/product/' + item.product}">${item.name}</a>
                    </div>
                    <div>
                      Qty:
                      <select  class="qty-select"
                      value="${item.qty}"
                      id="${item.product}">
                      ${[...Array(item.countInStock).keys()].map((x) =>
                        item.qty == x + 1
                          ? `<option value="${x + 1}" selected  >${
                              x + 1
                            }</option>`
                          : `<option value="${x + 1}"  >${x + 1}</option>`
                      )}
                    </select>                       
                      <button
                        type="button"
                        class="delete-button"
                        id="${item.product}"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div class="cart-price">$${item.price}</div>
                </li>`
                )
                .join('')
        }
      </ul>
    </div>
    <div class="cart-action">
      <h3>
        Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button id="checkout-button" class="button primary full-width" >
        Proceed to Checkout
      </button>
    </div>
  </div>
  `;
  },
};

export default CartScreen;
