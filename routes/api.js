const fs = require('fs');
const cmd = require('node-cmd');
const router = require('express').Router();

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
let process
router.post('/run-zinc', (req, res) => {
	let flags = req.body.flags;
	let files = req.body.files;

	// make sure files exist for minizinc command line
	let tmpFiles = [];
	for (let file of files) {
		fs.writeFile(`./tmp/${file.name}`, file.code, function (err) {
			if (err) {
				console.log('err: ', err);
				// res.send(err);
			}
		});
		tmpFiles.push(`./tmp/${file.name}`);
	}

	//files now exist in 'tmp' folder
	process = cmd.get(`minizinc ${flags.join(' ')} ${tmpFiles.join(' ')}`, function (
		err,
		data,
		stderr,
	) {
		if (!err) {
			console.log('the node-cmd returned with:\n\n', data);
			res.send({
				message: data,
				error: false
			});
		} else {
			console.log('error: ', stderr);
			let response = stderr;
			response = response.replace('./tmp/', ''); //remove tmp folder stuff
			res.send({
				message: response,
				error: true
			});
		}
		tmpFiles.forEach(file => {
			fs.unlink(file, () => {}); // delete files after computation
		});
	});
});


router.post('/kill-last', (req, res) => {
	cmd.get(`kill ${process.pid}`, function (
		err,
		data,
		stderr,
	) {
		if (!err) {
			console.log('Killed the last operation:\n\n', data);
			res.send({
				message: `Killed the last operation:\n\n${data}`,
				error: false
			});
		} else {
			console.log('error: ', stderr);
			res.send({
				message: `Killed the last operation:\n\n${data}`,
				error: true
			});
		}
	});
})
module.exports = router;