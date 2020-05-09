const express = require('express');
const app = express();
const port = 5000;
const scraping = require('./routes/api/scraping');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const DB = require('./database/keys').mongoURI;
const path = require('path');

require('./database/passport')(passport);

mongoose.connect(DB,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(() => console.log('Connected to mongoDB..')).catch(error => console.log(error));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/users',users);
app.use('/api/scraping',scraping);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('my-web-scraper/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))