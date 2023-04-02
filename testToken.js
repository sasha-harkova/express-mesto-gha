const jwt = require("jsonwebtoken");
const YOUR_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDIwNzJkYmI2MGE0MzBiYTVmMTcxNDIiLCJpYXQiOjE2ODA0NDc3MDEsImV4cCI6MTY4MTA1MjUwMX0.hJiMkWtF4kA4B-UM-fUGF0L4NIqUTgoOTixDCaIdta8"; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = "d41d8cd98f00b204e9800998ecf8427e"; // вставьте сюда секретный ключ для разработки из кода
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log(
    "\x1b[31m%s\x1b[0m",
    `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`
  );
} catch (err) {
  if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Всё в порядке. Секретные ключи отличаются"
    );
  } else {
    console.log("\x1b[33m%s\x1b[0m", "Что-то не так", err);
  }
}
