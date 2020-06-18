import {
  redirectUser,
  isLoggedIn,
  showLoading,
  showMessage,
  hideLoading,
} from '../utils.js';
import { register } from '../api.js';
import { setUserInfo } from '../localStorage.js';

const RegisterScreen = {
  after_render: () => {
    if (isLoggedIn()) {
      redirectUser();
      return;
    }

    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById('name').value,
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
        <form id="register-form">
          <ul class="form-container">
            <li>
              <h2>Create Account</h2>
            </li> 
            <li>
              <label for="name">Name</label>
              <input
                type="name"
                name="name" 
                required
                id="name" />
            </li>
            <li>
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"   
                required          
                />
            </li>
            <li>
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required        
                autocomplete="on"
                />
            </li>
            <li>
              <label for="re-password">Re-Enter Password</label>
              <input
                type="password"
                id="re-password"
                name="re-password"
                required            
                autocomplete="on"
                />
            </li>
            <li>
              <button type="submit" class="primary">
                Register
              </button>
            </li>
            <li>
              <div>Already have an account? <a href="/#/signin"> Sign-In </a>
              </div>
            </li>
          </ul>
        </form>
      </div>`,
};
export default RegisterScreen;
