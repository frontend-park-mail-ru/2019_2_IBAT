'use strict';

const express = require('express');
const PORT = 3000;
const PUBLIC = 'public';
const publicDirname = __dirname.replace('server', `${PUBLIC}`);

const app = express();
app.use(express.static(publicDirname));

app.get('/', (req, res) => {
  res.sendFile(publicDirname + '/index.html', (err) => {
    res.statusCode = 404;
    res.send(err);
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});