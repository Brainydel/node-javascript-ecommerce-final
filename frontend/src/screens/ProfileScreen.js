import { rerender } from '../utils.js';
import { update } from '../api.js';
import { getUserInfo, setUserInfo, removeAllInfo } from '../localStorage.js';

let { _id: userId, name, email, password } = getUserInfo();
let loading = false;
let error = false;
let success = false;
const ProfileScreen = {
  after_render: () => {
    if (!email) {
      document.location.hash = '/signin';
    }
    document.getElementById('logout-button').addEventListener('click', () => {
      removeAllInfo();
      document.location.hash = '/';
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        loading = true;
        rerender(ProfileScreen);
        name = document.getElementById('name').value;
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;

        const data = await update({
          userId,
          email,
          name,
          password,
        });
        if (data.error) {
          error = data.error;
          loading = false;
          rerender(ProfileScreen);
        } else {
          error = false;
          loading = false;
          success = 'Profile Updated Successfully.';
          setUserInfo(data);
          rerender(ProfileScreen);
        }
      });
  },
  render: () => `
      <div class="profile">
        <div class="profile-info">
          <div class="form">
            <form id="profile-form">
              <ul class="form-container">
                <li>
                  <h2>User Profile</h2>
                </li>
                <li>
              ${loading ? '<div>Loading...</div>' : ''}
              ${error ? `<div class="error">${error}</div>` : ''}
              ${success ? `<div class="success">${success}</div>` : ''}
            </li>
                <li>
                  <label htmlFor="name">Name</label>
                  <input
                    value="${name}"
                    type="text"
                    name="name"
                    id="name"
                    required />
                </li>
                <li>
                  <label htmlFor="email">Email</label>
                  <input
                    value="${email}"
                    type="email"
                    name="email"
                    required
                    id="email" />
                </li>
                <li>
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password"
                    id="password"
                    name="password" />
                </li>

                <li>
                  <button type="submit" class="button primary">
                    Update
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    id="logout-button" 
                    class="button secondary full-width"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>         
      </div>`,
};

export default ProfileScreen;
