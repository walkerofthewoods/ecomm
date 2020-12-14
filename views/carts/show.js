const layout = require('../layout');

let dummy = 0;

module.exports = ({ items }) => {
	let totalPrice = 0;
	let totalItems = 0;
	for (let item of items) {
		totalPrice += item.quantity * item.product.price;
		totalItems += item.quantity;
	}

	const renderedItems = items
		.map((item) => {
			return `
        <div class="cart-item message">
          <h3 class="subtitle"><img style="height:70px" src="data:image/png;base64, ${item.product.image}"/> ${item
				.product.title} </h3>
          <div class="cart-right">
            <div>
              $${item.product
					.price}  X <input type="number" min="0" max="99" style="width:40px" value="${item.quantity}"></input>
            </div>
            <div class="price is-size-4">
              $${item.product.price * item.quantity}
            </div>
            <div class="remove">
              <form method="POST" action="/cart/products/delete">
                <input hidden value="${item.id}" name="itemId" />
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
		})
		.join('');

	return layout({
		content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total (${totalItems} items)
              </div>
              <h1 class="title">$${totalPrice}</h1>
              <button class="button is-primary">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `
	});
};
