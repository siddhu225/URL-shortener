const express = require('express');
require('./db/mongoose')
const userRouter = require('./controllers/User');
const urlRouter = require('./controllers/Url');
const cors = require('cors');
const bodyParser = require('body-parser');
const Url = require('./models/Url');


const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(urlRouter);

app.get('/', (req, res) => {
  res.send('hllllllllllllllllllll')
})

app.get('/:url', async (req, res) => {
  const { url } = req.params;
  try {
    Url.findOne({ urlCode: url}).then((data) => {
      if (!data) { return res.redirect('/') }
      res.redirect(data.longUrl);
    })
  } catch (e) {
    res.status(500).json('Server error');
  }
})

app.listen(8081);
