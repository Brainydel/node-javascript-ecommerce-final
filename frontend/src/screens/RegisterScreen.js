import { rerender, redirectUser, isLoggedIn } from '../utils.js';
import { register } from '../api.js';
import { setUserInfo } from '../localStorage.js';

let name = '';
let email = '';
let password = '';
let rePassword = '';
let loading = false;
let error = false;

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
        loading = true;
        rerender(RegisterScreen);
        name = document.getElementById('name').value;
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
        rePassword = document.getElementById('re-password').value;
        const data = await register({ name, email, password });
        if (data.error) {
          error = data.error;
          loading = false;
          rerender(RegisterScreen);
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
        <form id="register-form">
          <ul class="form-container">
            <li>
              <h2>Create Account</h2>
            </li>
            <li>
              ${loading ? '<div>Loading...</div>' : ''}
              ${error ? `<div class="error">${error}</div>` : ''}
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input
                type="name"
                name="name"
                value="${name}"
                required
                id="name" />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"   
                required             
                value="${email}"
                />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required       
                value="${password}"
                />
            </li>
            <li>
              <label htmlFor="re-password">Re-Enter Password</label>
              <input
                type="password"
                id="re-password"
                name="re-password"
                required            
                value="${rePassword}"
                />
            </li>
            <li>
              <button type="submit" class="button primary">
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
