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

const router = require('express').Router();

router.post('/run-zinc', (req, response) => {
	console.log('req: ', req.body);
	response.send(req);

	// let flags = req.body.flags;
	// let files = req.body.files;

	//make sure files exist for minizinc command line
	// let tmpFiles = [];
	// for (file of files) {
	// 	fs.writeFile(`./tmp/${file.name}`, file.code, function(err) {
	// 		if (err) {
	// 			response.send(err);
	// 		}
	// 		console.log(`The file ${file.name} was saved!`);
	// 	});
	// 	tmpFiles.push(`./tmp/${file.name}`);
	// }

	// //files now exist in 'tmp' folder
	// cmd.get(`minizinc ${flags.join(' ')} ${tmpFiles.join(' ')}`, function(
	// 	err,
	// 	data,
	// ) {
	// 	if (!err) {
	// 		console.log('the node-cmd returned with:\n\n', data);
	// 	} else {
	// 		console.log('error', err);
	// 	}
	// });

	// axios.post(req.body.url, req.body).then(function(res) {
	// 	response.send(res.data);
	// });
});

module.exports = router;
