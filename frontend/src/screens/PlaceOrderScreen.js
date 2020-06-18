import {
  getCartItems,
  getShipping,
  getPayment,
  cleanCart,
} from '../localStorage.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { createOrder } from '../api.js';
import { showLoading, hideLoading } from '../utils.js';

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) document.location.hash = '/cart';
  const shipping = getShipping();
  if (!shipping.address) document.location.hash = '/shipping';
  const payment = getPayment();
  if (!payment.paymentMethod) document.location.hash = '/payment';

  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    shipping,
    payment,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
const placeOrder = async () => {
  const order = convertCartToOrder();
  showLoading();
  const data = await createOrder(order);
  hideLoading();
  if (data.error) {
    showLoading(data.error);
  } else {
    cleanCart();
    document.location.hash = `/order/${data.data._id}`;
  }
};
const PlaceOrderScreen = {
  after_render: () => {
    document
      .getElementById('placeorder-button')
      .addEventListener('click', () => {
        placeOrder();
      });
  },
  render: () => {
    const {
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();

    return `
      <div>
      ${CheckoutSteps.render({
        step1: true,
        step2: true,
        step3: true,
        step4: true,
      })}
      <div class="placeorder">
          <div class="placeorder-info">
            <div>
              <h3>Shipping</h3>
              <div>
                ${shipping.address}, ${shipping.city},
                ${shipping.postalCode}, ${shipping.country},
              </div>
            </div>
            <div>
              <h3>Payment</h3>
              <div>Payment Method: ${payment.paymentMethod}</div>
            </div>
            <div>
              <ul class="cart-list-container">
                <li>
                  <h3>Shopping Cart</h3>
                  <div>Price</div>
                </li>
                ${
                  orderItems.length === 0
                    ? `<div>Cart is empty</div>`
                    : orderItems.map(
                        (item) =>
                          `<li>
                      <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}" />
                      </div>
                      <div class="cart-name">
                        <div>
                          <a href="/#/product/${item.product}">
                            ${item.name}
                          </a>
                        </div>
                        <div>Qty: ${item.qty}</div>
                      </div>
                      <div class="cart-price">$ ${item.price}</div>
                    </li>`
                      )
                }
              </ul>
            </div>
          </div>
          <div class="placeorder-action">
            <ul>              
              <li>
                <h3>Order Summary</h3>
              </li>
              <li>
                <div>Items</div>
                <div>$${itemsPrice}</div>
              </li>
              <li>
                <div>Shipping</div>
                <div>$${shippingPrice}</div>
              </li>
              <li>
                <div>Tax</div>
                <div>$${taxPrice}</div>
              </li>
              <li class="total">
                <div>Order Total</div>
                <div>$${totalPrice}</div>
              </li>
              <li>
                <button
                  class="primary fw"
                  id="placeorder-button"
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>`;
  },
};

export default PlaceOrderScreen;
