const express = require('express');
const app = express();
const passportSetup = require('./configs/passport-setup');
const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/efah";
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const cookieSession = require('cookie-session');
const key = require('./configs/keys');
const passport = require('passport');
const cors = require('cors');


// set up EJS 
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys : [key.session.cookieKey]
}));

app.use(cors());


//initialized passport
app.use(passport.initialize());
app.use(passport.session());

// serve static content 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res)=> {
    res.render('home');
})

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// connect to mongo
mongoose.connect(mongoUrl)
    .then(() => console.log('Mongo DB Connected...'))
    .catch(err => console.log(err));

app.listen(3000, () => {
    console.log('Server listening on port ', 3000);
})
