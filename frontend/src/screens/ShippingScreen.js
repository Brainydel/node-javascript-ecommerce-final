import CheckoutSteps from '../components/CheckoutSteps.js';
import { getShipping, setShipping } from '../localStorage.js';

const ShippingScreen = {
  after_render: () => {
    document.getElementById('shipping-form').addEventListener('submit', (e) => {
      e.preventDefault();
      setShipping({
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postal-code').value,
        country: document.getElementById('country').value,
      });
      document.location.hash = '/payment';
    });
  },
  render: () => {
    const { address, city, postalCode, country } = getShipping();
    return `
    <div>
      ${CheckoutSteps.render({ step1: true, step2: true })}
      <div class="form">
        <form id="shipping-form">
          <ul class="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label for="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value="${address}"
                required
              />
            </li>
            <li>
              <label for="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value="${city}"
                required
              />
            </li>
            <li>
              <label for="postal-code">Postal Code</label>
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                value="${postalCode}"
                required
              />
            </li>
            <li>
              <label for="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                value="${country}"
                required
              />
            </li>
            <li>
              <button type="submit" class="primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>`;
  },
};
export default ShippingScreen;
