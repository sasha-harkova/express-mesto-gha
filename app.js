const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, mongoConnect = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(mongoConnect, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6408825d8e92c091f58b67f4',
  };
  next();
});
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(1);
});
