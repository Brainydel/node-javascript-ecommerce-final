import { getProduct, updateProduct, uploadProductImage } from '../api.js';
import {
  parseRequestUrl,
  showLoading,
  hideLoading,
  showMessage,
} from '../utils.js';

const ProductEditScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document
      .getElementById('edit-product-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await updateProduct({
          _id: request.id,
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          image: document.getElementById('image').value,
          brand: document.getElementById('brand').value,
          category: document.getElementById('category').value,
          countInStock: document.getElementById('countInStock').value,
          description: document.getElementById('description').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          document.location.hash = '/productlist';
        }
      });
    document
      .getElementById('image-file')
      .addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        showLoading();
        const data = await uploadProductImage(bodyFormData);
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          showMessage('Image Uploaded Successfully.');
          console.log(data);
          document.getElementById('image').value = data.image;
        }
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    const {
      name,
      price,
      brand,
      description,
      image,
      countInStock,
      category,
    } = await getProduct(request.id);
    return `
    <div class="back-to-result">
    <a href="/#/productlist">Back to result</a>
  </div>
    <div class="form">
            <form id="edit-product-form">
              <ul class="form-container">
                <li>
                  <h2>Edit Product</h2>
                </li> 
                <li>
                  <label for="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value="${name}"
                    id="name" 
                  />
                </li>
                <li>
                  <label for="price">Price</label>
                  <input
                    type="text"
                    name="price"
                    value="${price}"
                    id="price"
                   />
                </li>
                <li>
                  <label for="image">Image (680 x 830)</label>
                  <input
                    type="text"
                    name="image"
                    value="${image}"
                    id="image"
                    />
                    <input
                    type="file"
                    name="image-file"
                    id="image-file"
                  />
                </li>
                <li>
                  <label for="brand">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value="${brand}"
                    id="brand"
                    />
                </li>
                <li>
                  <label for="countInStock">CountInStock</label>
                  <input
                    type="text"
                    name="countInStock"
                    value="${countInStock}"
                    id="countInStock"
                    />
                </li>
                <li>
                  <label for="name">Category</label>
                  <input
                    type="text"
                    name="category"
                    value="${category}"
                    id="category"
                    ?>
                </li>
                <li>
                  <label for="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    >${description}</textarea>
                    
                </li>
                <li>
                  <button type="submit" class="primary">
                    Update 
                  </button>
                </li> 
              </ul>
            </form>
    </div>`;
  },
};
export default ProductEditScreen;
