const express = require('express');
const Router = express.Router();
const Url = require('../models/Url');
const validUrl = require('valid-url');
const shortid = require('shortid');
const baseUrl = 'http://localhost:8081';


Router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.status(200).json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: new Date(),
        });

        await url.save();

        res.status(200).json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
})

module.exports = Router;