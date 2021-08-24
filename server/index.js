const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const router = require("./router");

const app = express();




const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json({limit : "1mb"}));
app.use('/', router);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});