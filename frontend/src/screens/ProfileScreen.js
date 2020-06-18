import { showLoading, hideLoading, showMessage } from '../utils.js';
import { update, getMyOrders } from '../api.js';
import { getUserInfo, setUserInfo, cleanUser } from '../localStorage.js';

const ProfileScreen = {
  after_render: () => {
    document.getElementById('logout-button').addEventListener('click', () => {
      cleanUser();
      document.location.href = '/';
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          email: document.getElementById('email').value,
          name: document.getElementById('name').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          showMessage('Profile Updated Successfully.', () => {
            document.location.reload();
          });
        }
      });
  },
  render: async () => {
    const { name, email } = getUserInfo();
    const orders = await getMyOrders();
    return `
      <div class="profile">
        <div class="profile-info">
          <div class="form">
            <form id="profile-form">
              <ul class="form-container">
                <li>
                  <h2>User Profile</h2>
                </li>
                <li> 
            </li>
                <li>
                  <label for="name">Name</label>
                  <input
                    value="${name}"
                    type="text"
                    name="name"
                    id="name"
                    required />
                </li>
                <li>
                  <label for="email">Email</label>
                  <input
                    value="${email}"
                    type="email"
                    name="email"
                    required
                    id="email" />
                </li>
                <li>
                  <label for="password">Password</label>
                  <input 
                    type="password"
                    id="password"
                    name="password" autocomplete="on" />
                </li>

                <li>
                  <button type="submit" class="primary">
                    Update
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    id="logout-button" 
                    class="fw"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div class="profile-orders">
         
          <table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              ${
                orders.length === 0
                  ? `<tr><td colspan="6">No Order Found</td></tr>`
                  : orders
                      .map(
                        (order) => `
                <tr>
                  <td>${order._id}</td>
                  <td>${order.createdAt}</td>
                  <td>${order.totalPrice}</td>
                  <td>${order.isPaid}</td>
                  <td>${order.isDelivered}</td>
                  <td>
                    <a href="/#/order/${order._id}">DETAILS</a>
                  </td>
                </tr>`
                      )
                      .join('\n')
              }
            </tbody>
          </table>
        </div>  
     </div>`;
  },
};

export default ProfileScreen;
