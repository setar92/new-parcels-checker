const cron = require('node-cron');
const mainlLogick = require('./helpers/check_new_parcels');
require('dotenv').config();


const period = process.env.PERIOD;
// Scheduling a function call every period minutes
cron.schedule(`*/${period} * * * *`, async () => {
    // Time check for the period from 22:00 to 08:00
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 8 && hour < 22) {
        await mainlLogick();
    }
}, {
    timezone: 'Europe/Riga' // Setting the time zone Latvia (Riga)
});