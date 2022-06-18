const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const port = process.env.PORT || 8082;

app.use(express.static(`${__dirname}/static`));
app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
    res.status(200).render('index');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
