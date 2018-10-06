const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'frontend/dist')));

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

const port = process.env.PORT || 3000;


const apiRouter = require('./api.js');

app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Listening on port  http://localhost:${port}`);
});
