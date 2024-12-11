const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

require('dotenv').config();

const products = [
  {
    id: "PRODUCT_1",
    name: 'Product 1',
    price: 100
  },
  {
    id: "PRODUCT_2",
    name: 'Product 2',
    price: 150
  },
  {
    id: "PRODUCT_3",
    name: 'Product 3',
    price: 300
  },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  res.json({ success: true, data: products });
});

app.get('/get-token', async (req, res) => {
  try {
    const result = await axios({
      url: `${process.env.PAYPAL_URL}/v1/oauth2/token`,
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      method: 'POST',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        grant_type: 'client_credentials'
      }
    });

    console.log(result.data);

    return res.json({ success: true, token: result?.data?.access_token })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
});

const PORT = process.env.BE_PORT || 6969;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`)
})