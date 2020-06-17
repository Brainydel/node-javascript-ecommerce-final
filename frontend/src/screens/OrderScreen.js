import {
  parseRequestURL,
  showLoading,
  hideLoading,
  rerender,
} from '../utils.js';
import { getOrder, getPaypalClientID, payOrder } from '../api.js';

let order = null;
// https://developer.paypal.com/docs/archive/checkout/integrate
const addPaypalSdk = async () => {
  const clientID = await getPaypalClientID();
  showLoading();
  if (!window.paypal) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypalobjects.com/api/checkout.js`;
    script.async = true;
    script.onload = () => handlePayment(clientID);
    document.body.appendChild(script);
  } else {
    handlePayment(clientID);
  }
};
const handlePayment = (clientID) => {
  window.paypal.Button.render(
    {
      // Configure environment
      env: 'sandbox',
      client: {
        sandbox: clientID,
        production: '',
      },
      // Customize button (optional)
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'pill',
      },

      // Enable Pay Now checkout flow (optional)
      commit: true,

      // Set up a payment
      payment(data, actions) {
        return actions.payment.create({
          transactions: [
            {
              amount: {
                total: order.totalPrice,
                currency: 'USD',
              },
            },
          ],
        });
      },
      // Execute the payment
      onAuthorize(data, actions) {
        return actions.payment.execute().then(async () => {
          showLoading();
          await payOrder(order._id, {
            orderID: data.orderId,
            payerID: data.payerID,
            paymentID: data.paymentID,
          });
          hideLoading();
          rerender(OrderScreen);
        });
      },
    },
    '#paypal-button'
  ).then(() => {
    hideLoading();
  });
};
const OrderScreen = {
  after_render: async () => {
    if (!order.isPaid) {
      addPaypalSdk();
    }
  },
  render: async () => {
    const request = parseRequestURL();
    order = await getOrder(request.id);

    return `
      <div>
        <div class="placeorder">
          <div class="placeorder-info">
            <div>
              <h3>Shipping</h3>
              <div>
                ${order.shipping.address}, ${order.shipping.city},
                ${order.shipping.postalCode}, ${order.shipping.country},
              </div>
              <div>
                ${
                  order.isDelivered
                    ? `Delivered at ${order.deliveredAt}`
                    : 'Not Delivered.'
                }
              </div>
            </div>
            <div>
              <h3>Payment</h3>
              <div>Payment Method: ${order.payment.paymentMethod}</div>
              <div>
                ${order.isPaid ? `Paid at ${order.paidAt}` : 'Not Paid.'}
              </div>
            </div>
            <div>
              <ul class="cart-list-container">
                <li>
                  <h3>Shopping Cart</h3>
                  <div>Price</div>
                </li>
                ${
                  order.orderItems.length === 0
                    ? `<div>Cart is empty</div>`
                    : order.orderItems.map(
                        (item) =>
                          `<li key={item._id}>
                          <div class="cart-image">
                          <img src="${item.image}" alt="${item.name}" />
                          </div>
                          <div class="cart-name">
                            <div>
                              <a to="${`/product/${item.product}`}">
                                ${item.name}
                              </a>
                            </div>
                            <div>Qty: ${item.qty}</div>
                          </div>
                          <div class="cart-price">$${item.price}</div>
                        </li>`
                      )
                }
              </ul>
            </div>
          </div>
          <div class="placeorder-action">
            <ul>
              <li class="placeorder-actions-payment">
                ${!order.isPaid ? `<div id="paypal-button"></div>` : ''}
              </li>
              <li>
                <h3>Order Summary</h3>
              </li>
              <li>
                <div>Items</div>
                <div>$${order.itemsPrice}</div>
              </li>
              <li>
                <div>Shipping</div>
                <div>$${order.shippingPrice}</div>
              </li>
              <li>
                <div>Tax</div>
                <div>$${order.taxPrice}</div>
              </li>
              <li>
                <div>Order Total</div>
                <div>$${order.totalPrice}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>`;
  },
};

export default OrderScreen;
