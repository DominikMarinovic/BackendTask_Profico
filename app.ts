import express, { Application } from 'express';
import bodyParser from 'body-parser';
import signUp from './src/routes/signUp.route';
import login from './src/routes/login.route';
import joke from './src/routes/joke.route';
import db from './models';

const app: Application = express();
const port = 5000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('Joke app');
});

app.use('/signup', signUp);
app.use('/login', login);
app.use('/joke', joke);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});

export default app;
