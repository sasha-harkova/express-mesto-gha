const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT, DB_ADDRESS } = require('./config');

const { router, routerForCreatingUserAndAuthorization } = require('./routes');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(errors());
app.use(routerForCreatingUserAndAuthorization);
app.use(auth);
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(1);
});
