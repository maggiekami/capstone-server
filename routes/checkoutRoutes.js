const express = require("express");
const app = express();
const { resolve } = require("path");
const router = express.Router();
require("dotenv").config({ path: "./.env" });
const { body, validationResult } = require("express-validator");

const cors = require("cors");
// const { CallTracker } = require("assert");

// app.use(express.static(__dirname));
app.use(express.urlencoded());
app.use(cors());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const domainURL = process.env.FRONTEND_URL;

  console.log("request ", req.body);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Order Total",
            },
            unit_amount: req.body.orderTotal * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
    });

    // console.log(session);

    // console.log("Redirecting...");

    return res.json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
