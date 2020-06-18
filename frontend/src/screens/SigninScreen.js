import {
  redirectUser,
  isLoggedIn,
  showLoading,
  hideLoading,
  showMessage,
} from '../utils.js';
import { signin } from '../api.js';
import { setUserInfo } from '../localStorage.js';

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
        showLoading();
        const data = await signin({
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
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
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                id="email" 
              />
            </li>
            <li>
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password" 
                autocomplete="on"
              />
            </li>
            <li>
              <button type="submit" class="primary">
                Signin
              </button>
            </li>
            <li>
            <div>New User? 
            <a href="/#/register">Create your account</a>
          <div>
          </li>
             
          </ul>
        </form>
      </div>`,
};
export default SigninScreen;
