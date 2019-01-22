const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/MTN-Frontend'));

app.listen(process.env.PORT || 8080);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/MTN-Frontend/index.html'));
});

console.log('Node App Started Listening');