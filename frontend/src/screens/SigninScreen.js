import { rerender } from '../utils.js';
import { signin } from '../api.js';

let email = '';
let password = '';
let loading = false;
let error = false;
const SigninScreen = {
  after_render: () => {
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loading = true;
      rerender(SigninScreen);
      email = document.getElementById('email').value;
      password = document.getElementById('password').value;
      const result = await signin(email, password);
      if (result.error) {
        error = result.error;
        loading = false;
        rerender(SigninScreen);
      } else {
        error = false;
        loading = false;
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (cartItems.length) {
          document.location.hash = '/shipping';
        } else {
          document.location.hash = '/';
        }
      }
    });
  },
  render: () => {
    const redirect = '/';

    return `<div class="form">
        <form id="signin-form"  >
          <ul class="form-container">
            <li>
              <h2>Sign-In</h2>
            </li>
            <li>
              ${loading ? `<div>Loading...</div>` : ``}
              ${error ? `<div class="error">${error}</div>` : ``}
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value=${email}
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value=${password}
              />
            </li>
            <li>
              <button type="submit" class="button primary">
                Signin
              </button>
            </li>
            <li>New to amazona?</li>
            <li>
              <a
                href="${
                  redirect === '/'
                    ? 'register'
                    : 'register?redirect=' + redirect
                }"
                class="button secondary text-center"
              >
                Create your amazona account
              </a>
            </li>
          </ul>
        </form>
      </div>`;
  },
};
export default SigninScreen;
