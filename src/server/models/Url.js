
const mongooose = require('mongoose');

const URLschema = new mongooose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: String,
    default: Date.now(),
  }
});

const urlModel = mongooose.model('url', URLschema);
module.exports = urlModel;