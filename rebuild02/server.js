const express = require('express');
const jsonf = require('jsonfile');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Now listening on P ${port}'));

jsonf.readFile('testdata.json', function (err, obj) {
    if (err) console.error(err)
    console.log(obj)
    app.get('/builds', (req, res) => res.json(obj))
});

app.get('/express_backend', (req, res) => {
    res.send({ express: 'We are connected'});
});
