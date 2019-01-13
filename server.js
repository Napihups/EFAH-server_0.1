const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passportSetup = require('./configs/passport-setup');
const cors = require('cors');
// const cookieSession = require('cookie-session');
const properties = require('./configs/properties');
// const passport = require('passport');

/**Import & INIT EFAH-MOUDLES */

// routes import ----------------------------------
// const authRoutes = require('./routes/api/auth-routes');
// const userRoutes = require('./routes/api/user-routes');
const ROUTE_AUTH = require('./efah_modules/UserAuthModule/ROUTE_Auth');
//-------------------------------------------------

// const mongoUrl = "mongodb://localhost:27017/efah";

//Body parser Middleware
app.use(bodyParser.json());



// setip up cookie session
// app.use(cookieSession({
//     maxAge : 24 * 60 * 60 * 1000,
//     keys : [properties.session.cookieKey]
// }));

// //setup passport
// app.use(passport.initialize());
// require('./efah_modules/commons/passport')(passport);
// app.use(passport.session());



// connect to mongo
// mongoose.connect(mongoUrl)
//     .then(() => console.log('Mongo DB Connected...'))
//     .catch(err => console.log(err));



//middldeware CORS 
app.use(cors({
    origin: 'http://localhost:8080'
}));

// setup static files  
// app.use('/views', express.static(__dirname + '/views'));



// Routes setup ------------------------------//
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
app.use('/auth', ROUTE_AUTH);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));