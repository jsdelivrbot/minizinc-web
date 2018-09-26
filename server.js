const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');

const app = express();
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'frontend/dist')));
const port = process.env.PORT || 3000;

/*
	let req = {
		body: {
			flags: string[]
			files: object[]: {
				name: string
				code: string
			}
		}
	}
*/
app.post('/run-zinc', (req, response) => {
	let flags = req.body.flags;
	let files = req.body.files;

	//make sure files exist for minizinc command line
	let tmpFiles = []
	for (file of files) {
		fs.writeFile(`./tmp/${file.name}`, file.code, function(err) {
			if (err) {
				response.send(err);
			}
			console.log(`The file ${file.name} was saved!`);
		});
		tmpFiles.push(`./tmp/${file.name}`)
	}

	//files now exist in 'tmp' folder
	cmd.get(`minizinc ${flags.join(' ')} ${}`, function(err, data, stderr) {
		if (!err) {
			console.log('the node-cmd cloned dir contains these files :\n\n', data);
		} else {
			console.log('error', err);
		}
	});

	// axios.post(req.body.url, req.body).then(function(res) {
	// 	response.send(res.data);
	// });
});

app.listen(port, () => {
	console.log(`Listening on port  http://localhost:${port}`);
});
