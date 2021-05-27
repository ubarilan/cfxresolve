const express = require('express');
const fetch = require('node-fetch');


const app = new express()

app.get('/api/fivemserver/:code', async(req, res) => {
	console.log(`req sent to ${req.url}`);
	try {
		const data = await fetch(`https://servers-live.fivem.net/api/servers/single/${req.params.code}`).then(data=>data.json());
		res.json(data);
		console.log(data)
	} catch(error) {
		res.status(404).json({status: 404});
	}
})

app.listen(4000)
