let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
// Express Route
const VeteranRoute = require('./routes/Veteranroute');
const CommunityRoute = require('./routes/Communityroute');
// Connecting mongoDB Database
mongoose
  .connect('mongodb://127.0.0.1:27017/VeteranDataBase')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use('/Veteran', VeteranRoute);
app.use('/Community', CommunityRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
