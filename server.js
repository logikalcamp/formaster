'use strict'
const path = require('path');
const express = require('express');
var cors = require('cors');
const API_PORT = process.env.PORT || 3000;
const router = express.Router();
const app = express();
var http = require('http').Server(app);
const mongoose = require('mongoose');
let bodyParser = require('body-parser');

const answers = require("./routes/answers");
const forms = require('./routes/forms');

app.use(cors());
app.set('trust proxy', true);
app.use(bodyParser.json({limit: '50mb', extended: true}))

app.use('/api', router);
app.use('/api/answers',answers)
app.use('/api/forms',forms)

const dbRoute = require('./config/keys').mongoURI;

try{

  mongoose.connect(dbRoute, {
    useNewUrlParser: true ,
     useUnifiedTopology: true,
     useFindAndModify: false
   });
  
  let db = mongoose.connection;
  db.once('open', () => console.log('connected to the database'));
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
catch(err){

}


router.get('/',(req,res)=>{
    res.send({response:"i am alive"}).status(200);
  })

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

var server = http.listen(API_PORT, () => {
    console.log('server is running on port', server.address().port);
  });
