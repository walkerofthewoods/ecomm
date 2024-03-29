module.exports = ({ content }) => {
	return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"></link>
      </head>

      <body class="admin">
        <header>
          <nav class="navbar navbar-bottom">
            <div class="container navbar-container">
              <div>
                <a href="/admin/products">
                  <h3 class="title">Admin Panel</h3>
                </a>
              </div>
              <div class="navbar-item">
                <div class="navbar-buttons">
                <div class="navbar-item">
                  <a href="/signout"><i class="fa fa-sign-out-alt"></i> Log Out</a>
                  </div>
                  <div class="navbar-item">
                    <a href="/"><i class="fa fa-home"></i> Home</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div class="container">
          ${content}
        </div>
      </body>
    </html>
  `;
};
