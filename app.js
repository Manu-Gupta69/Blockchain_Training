const express = require('express');
const config = require('dotenv').config();

const bip39Routes = require('./routes/bip39');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/bip39', bip39Routes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
