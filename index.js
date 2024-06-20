// index.js
const cron = require('node-cron');
const mainlLogick = require('./helpers/check_new_parcels');
require('dotenv').config();

const period = process.env.PERIOD;
// Scheduling a function call every period minutes
cron.schedule(`*/${period} * * * *`, async () => {
        await mainlLogick();
}, {
    timezone: 'Europe/Riga' // Setting the time zone Latvia (Riga)
});
