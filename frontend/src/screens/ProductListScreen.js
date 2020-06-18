import { getProducts, createProduct, deleteProduct } from '../api.js';
import { showLoading, rerender, hideLoading } from '../utils.js';

const ProductListScreen = {
  after_render: () => {
    document
      .getElementById('create-product-button')
      .addEventListener('click', async () => {
        const { data } = await createProduct();
        document.location.hash = `/product/${data._id}/edit`;
      });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure to delete this product?')) {
          showLoading();
          await deleteProduct(deleteButton.id);
          hideLoading();
          rerender(ProductListScreen);
        }
      });
    });
    const editButtons = document.getElementsByClassName('edit-button');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', () => {
        document.location.hash = `/product/${editButton.id}/edit`;
      });
    });
  },
  render: async () => {
    const products = await getProducts({});
    return `
    <div class="content">
        <div class="product-header">
          <h3>Products</h3>
          <button id="create-product-button" class="primary">
            Create Product
          </button>
        </div> 

        <div class="product-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              ${products
                .map(
                  (product) =>
                    `
                <tr>
                  <td>${product._id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>${product.category}</td>
                  <td>${product.brand}</td>
                  <td>
                    <button id="${product._id}" class="edit-button">Edit</button> 
                    <button id="${product._id}" class="delete-button">Delete</button>
                  </td>
                </tr>`
                )
                .join('\n')}
            </tbody>
          </table>
        </div>
      </div>`;
  },
};
export default ProductListScreen;
