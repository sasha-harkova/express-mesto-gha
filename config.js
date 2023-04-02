require('dotenv').config();

const { PORT = 'PORT' || 3000} = process.env;
const { DB_ADDRESS = 'DB_ADDRESS' ||  'mongodb://127.0.0.1:27017/mestodb'} = process.env;
const { JWT_SECRET = 'JWT_SECRET' || 'd41d8cd98f00b204e9800998ecf8427e'} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
};
 