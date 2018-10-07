const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'frontend/dist')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const port = process.env.PORT || 3000;


const apiRouter = require('./api.js');

app.use(cors());

app.use('/api', apiRouter);


app.listen(port, () => {
	console.log(`Listening on port  http://localhost:${port}`);
});
