require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');

const app = express();

app.use(express.json());

app.use(require('./src/routes'));

app.use('*', (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

const PORT = process.env.APP_PORT || 4173;

app.listen(PORT, () => {
    console.log("API is running on port", PORT);
});