const express = require('express');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

const user = require('./routes/api/user');
const book = require('./routes/api/book');
const error404 = require('./middleware/err-404');

const bookController = require('./controllers/booksPages');

const PORT = process.env.PORT || 3000; 
const DB_URL = process.env.DB_URL || "localhost";

const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/public', express.static(`${__dirname}/public`));
app.use('/api/user', user);
app.use('/api/books', book);

app.use(error404);


async function start() {
    try {
        console.log(DB_URL);
    await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
    });
    bookController.addBooks();
    app.listen(PORT, () =>{
        console.log(`Сервер запущен на http://localhost:${PORT}`)
    });
     

    } catch (error) {
        console.log(error);
    }
}

start();