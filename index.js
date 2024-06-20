// index.js

const express = require('express');
const cron = require('node-cron');
const mainlLogick = require('./helpers/check_new_parcels');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const period = process.env.PERIOD;
// Scheduling a function call every period minutes
cron.schedule(`*/${period} * * * *`, async () => {
        await mainlLogick();
}, {
    timezone: 'Europe/Riga' // Setting the time zone Latvia (Riga)
});

app.get('/', (req, res) => {
    res.send('The server is running');
});

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    console.log("Starting initial parcel check...");
    try {
        await mainlLogick();
    } catch (error) {
        console.error("Error during initial parcel check:", error);
    }
});

module.exports = app;