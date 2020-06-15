import { getUserInfo } from '../localStorage.js';

const Header = {
  render: async () => {
    const view = ` 
      <div class="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <a href="/#/" >amazona</a>
      </div> 
      <div id="header-links" class="header-links">
        <a href="/#/signin">Sign-In</a>
        <a href="/#/cart">Cart</a>
      </div> 
        `;
    return view;
  },
  after_render: async () => {
    const { name } = getUserInfo();
    if (name) {
      document.getElementById('header-links').innerHTML = `
        <a href="/#/profile">${name}</a>
        <a href="/#/cart">Cart</a>`;
    }
  },
};

export default Header;
