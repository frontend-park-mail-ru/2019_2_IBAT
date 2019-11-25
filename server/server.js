'use strict';

const express = require('express');
const path = require('path');

const PORT = 8080;

const dist = 'public/dist/';
// const CHAT = 'chat.html';
const distPath = path.resolve(__dirname, '..', `${dist}`);

const app = express();

// app.get('/chat', (req, res) => {
//   res.sendFile(chatPath, (err) => {
//     res.statusCode = 404;
//     res.send(err);
//   });
// });

app.use(express.static(distPath));

app.get('/sw.js' ,(req, res) => {
  res.sendFile(`${distPath}/static/sw.js`, (err) => {
    res.statusCode = 404;
    res.send(err);
  });
});

app.get('*', (req, res) => {
  res.sendFile(`${distPath}/index.html`, (err) => {
    res.statusCode = 404;
    res.send(err);
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
