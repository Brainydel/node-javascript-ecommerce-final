import { rerender, redirectUser, isLoggedIn } from '../utils.js';
import { signin } from '../api.js';
import { setUserInfo } from '../localStorage.js';

let loading = false;
let error = false;
const SigninScreen = {
  after_render: () => {
    if (isLoggedIn()) {
      redirectUser();
      return;
    }

    document
      .getElementById('signin-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        loading = true;
        rerender(SigninScreen);
        const data = await signin({
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        if (data.error) {
          error = data.error;
          loading = false;
          rerender(SigninScreen);
        } else {
          error = false;
          loading = false;
          setUserInfo(data);
          redirectUser();
        }
      });
  },
  render: () => `
  <div class="form">
        <form id="signin-form"  >
          <ul class="form-container">
            <li>
              <h2>Sign-In</h2>
            </li>
            <li>
              ${loading ? '<div>Loading...</div>' : ''}
              ${error ? `<div class="error">${error}</div>` : ''}
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email" 
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password" 
              />
            </li>
            <li>
              <button type="submit" class="button primary">
                Signin
              </button>
            </li>
            <li>
            <div>New User? <a
            href="/#/register"
            class="button secondary text-center"
          >
            Create your account
          </a>
          <div>
          </li>
             
          </ul>
        </form>
      </div>`,
};
export default SigninScreen;
