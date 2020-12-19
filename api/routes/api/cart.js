const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const paypal = require('paypal-rest-sdk');
const ejs = require('ejs');

require('dotenv').config();

const User = require('../../models/User');
const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
});

// @route   GET api/cart
// @desc    GET a cart
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/checkout', (req, res) => res.render('checkout'));

// @route   POST api/cart/checkout
// @desc    checkout item in shopping cart with paypal
// @access  Private

router.get('/checkout/pay', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    const items = [];
    for (let i = 0; i < cart.products.length; i++) {
      const item = {
        name: cart.products[i].itemName,
        price: `${cart.products[i].price}`,
        currency: 'USD',
        quantity: cart.products[i].quantity,
      };
      items.unshift(item);
    }

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: process.env.returnUrl,
        cancel_url: process.env.cancelUrl,
      },
      transactions: [
        {
          item_list: {
            items,
          },
          amount: {
            currency: 'USD',
            total: `${cart.sum}`,
          },
          description: 'This is the payment description.',
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.json(payment.links[i].href);
          }
        }
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/cart/success
// @desc    if payment is succeed, then, it will be executed, and then, return the success page
// @access  Private

router.get('/success', auth, async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  let cart = await Cart.findOne({ user: req.user.id });

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: `${cart.sum}`,
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      // clear cart
      cart.products = [];
      res.send('Success');
    }
  });
});

// @route   POST api/cart/success
// @desc    if payment is succeed, then, it will be executed, and then, return the success page
// @access  Private
router.get('/cancel', (req, res) => res.send('Cancelled'));

// @route   POST api/cart
// @desc    if a cart exist of this user, put product in it, else reate a cart and add the product
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('itemName', 'Product name is required').not().isEmpty(),
      check('quantity', 'Product quantity is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { itemName, quantity } = req.body;
    const product = await Product.findOne({ itemName: itemName });
    const { price, imagePath } = product;
    if (quantity > product.amount) {
      return res.status(400).send('Order quantity exceeds available products');
    }
    // update product amount
    product.amount -= quantity;
    await product.save();

    try {
      let cart = await Cart.findOne({ user: req.user.id });

      if (cart) {
        // cart exists for user
        let itemIndex = cart.products.findIndex((p) => p.itemName == itemName);
        if (itemIndex > -1) {
          // product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity += quantity;
          cart.products[itemIndex] = productItem;
        } else {
          // product does not exist in the cart, add a new item
          cart.products.push({ itemName, imagePath, price, quantity });
        }

        // update current sum
        cart.sum = 0;
        cart.products.map((p) => {
          cart.sum += p.price * p.quantity;
        });

        await cart.save();
        res.json(cart);
      } else {
        // there is no cart for this user, create a cart
        const newCart = await Cart.create({
          user: req.user.id,
          products: [{ itemName, imagePath, price, quantity }],
        });
        res.json(newCart);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/cart/clear
// @desc    Delete all products in the cart
// @access  Private
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    cart.products = [];
    cart.sum = 0;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
  }
});

// @route   DELETE api/cart/:id/:product_id
// @desc    Delete a product from the cart
// @access  Private

router.delete(
  '/',
  [
    auth,
    [
      check('itemName', 'Product name is required').not().isEmpty(),
      check('quantity', 'Product quantity is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { itemName, quantity } = req.body;
      let cart = await Cart.findOne({ user: req.user.id });

      if (cart) {
        // if cart is empty
        if (cart.products.length === 0) {
          return res.status(400).send('Cart is empty');
        }

        let itemIndex = cart.products.findIndex((p) => p.itemName === itemName);
        // check product exist in cart
        if (itemIndex > -1) {
          const product = await Product.findOne({ itemName: itemName });
          let productItem = cart.products[itemIndex];
          if (productItem.quantity < quantity) {
            return res
              .status(400)
              .send('Cannot remove more than prochased quantity');
          }

          // put back product amount to online store
          product.amount += quantity;
          product.save();

          // remove product amount from the shopping cart
          productItem.quantity -= quantity;

          // if product === 0 remove this product from the shopping cart
          if (productItem.quantity === 0) {
            cart.products.splice(itemIndex, 1);
          }
          // update current sum
          cart.sum = 0;
          cart.products.map((p) => {
            cart.sum += p.price * p.quantity;
          });
          await cart.save();
          res.json(cart);
        }
      } else {
        return res
          .status(404)
          .json({ msg: 'There is not purchase in your cart yet' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
