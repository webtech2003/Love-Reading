const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User');
const path = require('path');
const GeneralInfo = require('./models/GeneralInfo');

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meetings');
const discussionRoutes = require('./routes/discussions');
const storyRoutes = require('./routes/stories');
const suggestionRoutes = require('./routes/suggestions');
const userRoutes = require('./routes/users');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/loveReading', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect('mongodb+srv://gtdev8303:F_d%2429_cR%40V6f%232@clustor105.7rx0lgg.mongodb.net/loveReading?retryWrites=true&w=majority&appName=Clustor105').then(r => console.log("Connected")).catch((err)=>console.log(err));

mongoose.connection.on("connected", ()=>console.log('connected'));
mongoose.connection.on("error", (e)=>console.log('Error', e));
// Middleware setup
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (e.g., CSS, JavaScript)
// app.use(express.static(path.join(__dirname, 'public')));

// Passport.js configuration
// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



// Define routes
// app.get('/', (req, res) => {
//   res.render('index');
// });

app.get('/', (req, res) => {
  res.status(200).send({
    status: "success",
    message: "welcome"
  });
});

// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

// app.use('/', indexRoutes);
// app.use('/', authRoutes);
// app.use('/', meetingRoutes);
// app.use('/', discussionRoutes);
// app.use('/', storyRoutes);
// app.use('/', suggestionRoutes);
// app.use('/', userRoutes);

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
