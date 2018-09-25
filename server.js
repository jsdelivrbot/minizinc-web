const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'frontend/dist')));
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port  http://localhost:${port}`);
});
