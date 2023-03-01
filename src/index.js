const path = require('path');
const express = require('express');
const exhbs = require('express-handlebars');
const methodOverride = require('method-override');


const app = express();
const port = 4000;

const route = require('./routes');
const db = require('./config/db');
const sortMiddleware = require('./app/middlewares/sortMiddleware');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//http://localhost:3000/img/logo.png

//middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//Custom middlewares
app.use(sortMiddleware);

//Template engine
app.engine(
    'hbs',
    exhbs.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
