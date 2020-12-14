const cartsRepo = require('../repositories/carts');

module.exports = ({ content }) => {
	/* 
  
  what is req.session?  not defined here.
  
  console.log(req.session);

	async function greet() {
		if (!req.session.cartId) {
			console.log('cart empty');
			// display cart(0)
		} else {
			const cart = await cartsRepo.getOne(req.session.cartId);

			let totalItems = 0;
			for (let item of cart.items) {
				totalItems += cart.items.quantity;
			}
			console.log('Cart has ', totalItems, ' items.');
		}
	}
	greet(); */

	return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      </head>

      <body>
        <header>
          <nav class="navbar navbar-top">
            <div class="container navbar-container">
              <div>
                <ul class="social">
                  <li>
                    <a href="https://walkerofthewoods.github.io/"><i class="fa fa-phone"></i>+1 555 123 4567</a>
                  </li>
                  <li>
                    <a href="https://walkerofthewoods.github.io/"><i class="fa fa-envelope"></i> shop@example.com</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="social">
                  <li><a href="https://walkerofthewoods.github.io/"><i class="fab fa-facebook"></i></a></li>
                  <li><a href="https://walkerofthewoods.github.io/"><i class="fab fa-twitter"></i></a></li>
                  <li><a href="https://walkerofthewoods.github.io/"><i class="fab fa-linkedin"></i></a></li>
                  <li><a href="https://walkerofthewoods.github.io/"><i class="fab fa-google-plus"></i></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <nav class="navbar navbar-bottom">
            <div class="container navbar-container">
              <div>
                <a href="/">
                  <h3 class="title">EComm Shop</h3>
                </a>
              </div>
              <div class="navbar-item">
                <div class="navbar-buttons">
                  <div class="navbar-item">
                    <a href="/admin/products"><i class="fa fa-users-cog"></i> Admin Panel</a>
                  </div>
                  <div class="navbar-item">
                    <a href="/"><i class="fa fa-home"></i> Home</a>
                  </div>
                  <div class="navbar-item">
                    <a href="/cart"><i class="fa fa-shopping-cart"></i> Cart</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        ${content}
      </body>
    </html>
  `;
};
