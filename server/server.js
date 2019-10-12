'use strict';

const express = require('express');
const path = require('path');
const uuid = require('uuidv4').default;

const PORT = 3000;
const PUBLIC = 'public';

const users = {};
const ids = {};
const resumes = [
  {
    name: 'Java бог',
    back: 5,
    salary: 1000000,
  },
  {
    name: 'UI/UX инженер',
    back: 1,
    salary: 10000,
  },
];
const vacancies = [
  {
    name: 'Java слуга',
  },
  {
    name:
      'Чел, который сделает и бек, и фронт, и дизайн, и кинет магазин в первые страницы поисковика',
  },
];

const app = express();
app.use(express.static(path.resolve(__dirname, '..', `${PUBLIC}`)));

app.post('/seeker', (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const password = req.body.password;
  const hhRole = 'seeker';

  if (users[email]) {
    res.status(400).json({ error: 'Такой пользователь уже существует!' });
  }

  const sessionId = uuid();
  ids[sessionId] = email;
  users[email] = {
    email,
    firstName,
    secondName,
    password,
    hhRole,
  };

  res.cookie('session_id', sessionId);
  res.cookie('hh_role', hhRole);
  res.status(200);
});

app.post('/employer', (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const orgName = req.body.orgName;
  const orgFormat = req.body.orgFormat;
  const password = req.body.password;
  const hhRole = 'employer';

  if (users[email]) {
    res.status(400).json({ error: 'Такой пользователь уже существует' });
  }

  const sessionId = uuid();
  ids[sessionId] = email;
  users[email] = {
    email,
    firstName,
    secondName,
    orgName,
    orgFormat,
    password,
    hhRole,
  };

  res.cookie('session_id', sessionId);
  res.cookie('hh_role', hhRole);
  res.status(200);
});

app.post('/auth', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = users.find(it => it.email === email && it.password === password);
  if (user === undefined) {
    return res.status(400).json({ error: 'Неправильный email или пароль!' });
  }

  if (ids[req.cookie['session_id']]) {
    return res
      .redirect('/')
      .status(405)
      .json({ error: 'Пользователь уже авторизирован!' });
  }

  const alreadyLoggedUserSessionId = ids.keys.find(session => session.email === user.email);
  if (alreadyLoggedUserSessionId) {
    res.cookie('session_id', alreadyLoggedUserSessionId);
  } else {
    const sessionId = uuid();
    ids[sessionId] = email;
    res.cookie('session_id', sessionId);
    res.cookie('hh_role', user.role);
    res.status(200);
  }
});

app.del('/auth', (req, res) => {
  const sessionId = req.cookie['session_id'];
  if (!ids[sessionId]) {
    return res.status(405).json({ error: 'Пользователь не авторизован!' });
  }
  delete ids.sessionId;
});

app.get('/resumes', (res, req) => {
  res.json(resumes);
});

app.get('/vacancies', (res, req) => {
  res.json(vacancies);
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
