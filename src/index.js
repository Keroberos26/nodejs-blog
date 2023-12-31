const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');

const route = require('./routes');
const db = require('./config/db');
const SoftMiddleware = require('./app/middlewares/SortMiddleware');

db.connect();

const app = express();
const port = 4000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

//Custom Middleware
app.use(SoftMiddleware);

// HTTP Logger
app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'fa-solid fa-sort',
          asc: 'fa-solid fa-arrow-up-wide-short',
          desc: 'fa-solid fa-arrow-down-wide-short',
        };

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}" class="ms-2">
                  <i class="${icon}"></i>
                </a>`;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
