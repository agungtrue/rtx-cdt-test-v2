import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './src/config.js';

// routes 
import routes from './src/routes/index.js';

const port = config.service.port || 3000;

// 1. Set up the express app
const app = express();
// app.use(express.json());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors open '*'
app.use(cors({
  origin: '*',
}));

// 2. Require our routes into the application.
app.use(routes);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.get('*', (req, res) => res.status(404).send({
  message: 'Not Found',
}));

// 3. Server listen to port
app.listen(port, () => console.log(`Server listening on port ${port}`))

export default app;