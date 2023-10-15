const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

console.log(path.join(__dirname, 'public'))

// HTTP Logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));