const express = require('express');
const fileRoute = require('./middleware/file');
const logger = require('./middleware/logger');
const error404 = require('./middleware/err-404');
const books = require('./routes/books');
const app = express();

app.use(logger);
app.use('/api/books/:id/download', express.static(__dirname + '/public'));
app.use('/api/books', books);
app.use('/demo', fileRoute);
app.use(express.json);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
