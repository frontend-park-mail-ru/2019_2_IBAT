'use strict';

const express = require('express');
const port = 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html', (err) => {
    res.statusCode = 404;
    res.send(err);
  });
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});