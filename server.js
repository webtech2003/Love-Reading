const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User');
const GeneralInfo = require('./models/GeneralInfo');


const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/loveReading', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Passport.js configuration
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meetings');
const discussionRoutes = require('./routes/discussions');
const storyRoutes = require('./routes/stories');
const suggestionRoutes = require('./routes/suggestions');
const userRoutes = require('./routes/users');

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', meetingRoutes);
app.use('/', discussionRoutes);
app.use('/', storyRoutes);
app.use('/', suggestionRoutes);
app.use('/', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
