const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const user = require('./routes/api/user');
const book = require('./routes/api/book');
const error404 = require('./middleware/err-404');

const bookController = require('./controllers/booksPages');
const userController = require('./controllers/userPages');

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'localhost';

const options = {
  usernameField: 'username',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, userController.verifyUser));

passport.serializeUser(userController.serializeUser);
passport.deserializeUser(userController.serializeUser);

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.json());
app.use(session({ secret: 'SECRET' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/user', userRouter);
app.use('/public', express.static(`${__dirname}/public`));
app.use('/api/user', user);
app.use('/api/books', book);

app.use(error404);

async function start() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
    });
    bookController.addBooks();
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
