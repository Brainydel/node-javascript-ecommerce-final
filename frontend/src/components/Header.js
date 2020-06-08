let Header = {
  render: async () => {
    let view = ` 
      <div class="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <a href="/" >amazona</a>
      </div> 
      <div class="header-links">
        <a href="cart.html">Cart</a>
      </div> 
        `;
    return view;
  },
  after_render: async () => {},
};

export default Header;
