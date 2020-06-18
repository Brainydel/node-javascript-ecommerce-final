import { showLoading, hideLoading, rerender } from '../utils.js';
import { deleteOrder, getOrders } from '../api.js';

const OrderListScreen = {
  after_render: () => {
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure to delete this product?')) {
          showLoading();
          await deleteOrder(deleteButton.id);
          hideLoading();
          rerender(OrderListScreen);
        }
      });
    });
    const editButtons = document.getElementsByClassName('edit-button');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', () => {
        document.location.hash = `/order/${editButton.id}`;
      });
    });
  },
  render: async () => {
    const orders = await getOrders();
    return `
  <div class="content" >
      <div class="order-header">
        <h3>Orders</h3>
      </div>
      <div class="order-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(
              (order) => `<tr key={order._id}>
              <td>${order._id}</td>
              <td>${order.createdAt}</td>
              <td>${order.totalPrice}</td>
              <td>${order.user.name}</td>
              <td>${order.isPaid.toString()}</td>
              <td>${order.paidAt}</td>
              <td>${order.isDelivered.toString()}</td>
              <td>${order.deliveredAt}</td>
              <td> 
                <button type="button" class="edit-button" id="${
                  order._id
                }">Edit</button>
                <button type="button" class="delete-button" id="${
                  order._id
                }">Delete</button>
              </td>
            </tr>`
            )}
          </tbody>
        </table>

      </div>
    </div>
    `;
  },
};
export default OrderListScreen;
