const express = require('express');
const bip39 = require('bip39');
const fs = require('fs/promises');
const path = require('path');
const sha256 = require('sha256');

const router = express.Router();

router.get('/mnemonic', (req, res, next) => {
  const mnemonic = bip39.generateMnemonic();

  res.json({ err: null, data: mnemonic });
});

router.post('/seed', async (req, res, next) => {
  try {
    const bytes = await bip39.mnemonicToSeed(req.body.phrase);
    const hexStringKey = bytes.toString('hex');

    res.json({ err: null, data: hexStringKey });
  } catch (err) {
    res.json({ err, data: null });
  }
});

router.post('/validate', (req, res, next) => {
  const flag = bip39.validateMnemonic(req.body.phrase);

  res.json({ err: null, data: flag });
});

router.post('/privatekey', async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'data.json');
    let data = await fs.readFile(dataPath);
    let n = JSON.parse(data).toString();
    const masterKey = sha256(req.body.masterKey + n);

    n = parseInt(n) + 1;
    fs.writeFile(dataPath, JSON.stringify(n));
    res.json({ err: null, data: masterKey });
  } catch (err) {
    res.json({ data: null, err });
  }
});

module.exports = router;
