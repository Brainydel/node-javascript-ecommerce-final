const Error404 = {
  render: async () => {
    return `<div class="message">
                <h1> 404 Error </h1>
                <p>
                Page Not Found!
                </p>
            </div>
        `;
  },
  after_render: async () => {},
};

export default Error404;
