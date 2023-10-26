const cookieParser = require('cookie-parser');
const express = require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { default: helmet } = require('helmet');
const error = require('./middlewares/error');
const appRouter = require('./routes/index');
const { createUser, login, logout } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { registerValidator, loginValidator } = require('./utils/validators/userValidator');
const { DATABASE_URL, PORT } = require('./utils/config');
const { limiter } = require('./utils/limiter');

const app = express();

app.use(helmet());
app.use(limiter);
app.use(cookieParser());

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Подключено к MongoDB');
}).catch((e) => {
  console.error('Ошибка подключения к MongoDB:', e);
});

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', registerValidator, createUser);

app.use(authMiddleware);

app.post('/logout', logout);
app.use(appRouter);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
