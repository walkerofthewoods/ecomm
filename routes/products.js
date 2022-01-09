const express = require("express");
const productsRepo = require("../repositories/products");
const productsIndexTemplate = require("../views/products/index");
const cartsRepo = require("../repositories/carts");

const router = express.Router();

router.get("/", async (req, res) => {
  // Figure out the cart
  let cart;
  let totalItems = 0;
  try {
    if (!req.session.cartId) {
      // We dont have a cart, we need to create one
      // store cart id on req.session.cartId

      cart = await cartsRepo.create({ items: [] });
      req.session.cartId = cart.id;
    } else {
      // we have a cart, lets get it from directory
      cart = await cartsRepo.getOne(req.session.cartId);

      for (let item of cart.items) {
        totalItems += item.quantity;
      }
    }
  } catch (error) {
    console.error(error);
  }

  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }, totalItems));
});

module.exports = router;
