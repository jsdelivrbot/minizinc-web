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
router.post('/run-zinc', (req, res) => {
	let flags = req.body.flags;
	let files = req.body.files;

	// make sure files exist for minizinc command line
	let tmpFiles = [];
	for (let file of files) {
		fs.writeFile(`./tmp/${file.name}`, file.code, function(err) {
			if (err) {
				console.log('err: ', err);
				// res.send(err);
			}
		});
		tmpFiles.push(`./tmp/${file.name}`);
	}

	//files now exist in 'tmp' folder
	cmd.get(`minizinc ${flags.join(' ')} ${tmpFiles.join(' ')}`, function(
		err,
		data,
	) {
		if (!err) {
			console.log('the node-cmd returned with:\n\n', data);
			res.send(data);
		} else {
			console.log('error', err);
		}
		tmpFiles.forEach(file => {
			fs.unlink(file, () => {}); // delete files after computation
		});
	});
});

module.exports = router;
