import { getUserInfo } from '../localStorage.js';
import { parseRequestURL } from '../utils.js';

const Header = {
  render: async () => {
    const { value } = parseRequestURL();
    const view = ` 
      <div class="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <a href="/#/" >amazona</a>
      </div>
      <div class="search">
        <form class="search-form"  id="search-form">
          <input type="text" name="q" id="q" value="${value || ''}" /> 
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>        
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
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });
  },
};

export default Header;
