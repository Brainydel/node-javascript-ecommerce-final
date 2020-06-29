const Error404 = {
  render: async () => {
    return `<div class="message">
              <div>
                <h1> 404 Error </h1>
                <p>
                Page Not Found!
                </p>
              </div>
            </div>
        `;
  },
  after_render: async () => {},
};

export default Error404;
