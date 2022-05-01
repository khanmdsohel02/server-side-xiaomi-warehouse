const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

// middlerware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server side is running')
});

app.listen(port, () => {
    console.log('port is working', port);
})