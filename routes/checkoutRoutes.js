const knex = require("knex")(require("../knexfile"));
const express = require("express");
const app = express();
const router = express.Router();

router.use(express.json());

require("dotenv").config({ path: "./.env" });

// app.use(express.static(__dirname));
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.FRONTEND_URL;

  // will require axios to include list items object along with quantity & price details
  const { cart_items, quantity } = req.body;

  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    // method 1
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "one",
          },
          unit_amount: 1 * 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "two",
          },
          unit_amount: 2 * 100,
        },
        quantity: 1,
      },
    ],

    // method 2
    // payment_method_types: ["card"],
    // mode: "payment",
    // line_items: data.map((item) => {
    //   return {
    //     price_data: {
    //       currency: "cad",
    //       product_data: {
    //         name: item.cardName,
    //       },
    //       unit_amount: item.price * 100,
    //     },
    //     quantity: 1,
    //   };
    // }),

    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
    // automatic_tax: {enabled: true},
  });

  return res.redirect(303, session.url);
});

module.exports = router;
