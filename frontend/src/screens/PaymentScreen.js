import CheckoutSteps from '../components/CheckoutSteps.js';
import { setPayment } from '../localStorage.js';

const PaymentScreen = {
  after_render: () => {
    document.getElementById('payment-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      ).value;
      setPayment({ paymentMethod });
      document.location.hash = '/placeorder';
    });
  },
  render: () => `
      <div>
      ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
        <div class="form">
          <form id="payment-form">
            <ul class="form-container">
              <li>
                <h2>Payment</h2>
              </li>

              <li>
                <div>
                  <input
                    type="radio"
                    name="payment-method"
                    id="paypal"
                    value="Paypal"
                    checked
                     />
                  <label for="paypal">Paypal</label>
                </div>
              </li>
              <li>
              <div>
                <input
                  type="radio"
                  name="payment-method"
                  id="stripe"
                  value="Stripe" 
                  disabled
                   />
                <label for="stripe">Stripe</label>
              </div>
            </li>

              <li>
                <button type="submit" class="primary">
                  Continue
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>`,
};
export default PaymentScreen;
