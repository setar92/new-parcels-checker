const cron = require('node-cron');
const mainlLogick = require('./helpers/check_new_parcels');
require('dotenv').config()


const period = process.env.PERIOD;
// Планування виклику функції кожні 5 хвилин
cron.schedule(`*/${period} * * * *`, async () => {
    // Перевірка часу для періоду з 22:00 до 08:00
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 8 && hour < 22) {
        console.log(3)

        await mainlLogick();
    }

}, {
    timezone: 'Europe/Riga' // Встановлюємо часовий пояс Латвія (Рига)
});

console.log('Сервер запущено');
