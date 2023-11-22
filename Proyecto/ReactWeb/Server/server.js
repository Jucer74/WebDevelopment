const fs = require('fs').promises;
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./users.json');

let userdb;

const SECRET_KEY = '123456789';
const expiresIn = '1h';

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

async function init() {
  try {
    const data = await fs.readFile('./users.json', 'utf-8');
    userdb = JSON.parse(data);
  } catch (err) {
    userdb = { users: [] };
  }
}

init();

function createToken(payload) {
  if (isLoginAuthenticated(payload)) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  }
  return null;
}

function isLoginAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function isRegisterAuthenticated({ email }) {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
}

server.post("/api/auth/register", async (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;

  // Validaciones
  if (password !== confirmedPassword) {
    const status = 400;
    const message = "Passwords do not match";
    res.status(status).json({ status, message });
    return;
  }

  if (isRegisterAuthenticated({ email })) {
    const status = 400;
    const message = "Email already exists";
    res.status(status).json({ status, message });
    return;
  }

  try {
    const newUser = {
      id: userdb.users.length + 1,
      email: email,
      password: password,
    };

    userdb.users.push(newUser);

    // Escribir en el archivo users.json y esperar a que se complete antes de responder
    await fs.writeFile('./users.json', JSON.stringify(userdb));

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    const status = 500;
    const message = "Internal Server Error";
    res.status(status).json({ status, message });
  }
});

server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

server.listen(4000, () => {
  console.log('Run Auth API Server');
});
