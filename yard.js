const cron = require('node-cron');
const mainlLogick = require('./helpers/check_new_parcels');
require('dotenv').config()



// Планування виклику функції кожні 5 хвилин
cron.schedule('*/0.5 * * * *', async () => {
    // Перевірка часу для періоду з 22:00 до 08:00
    console.log(1)
    const now = new Date();
    const hour = now.getHours();
    console.log(2)

    if (hour >= 8 && hour < 22) {
        console.log(3)

        await mainlLogick();
    }
    console.log(444)

}, {
    timezone: 'Europe/Riga' // Встановлюємо часовий пояс Латвія (Рига)
});

console.log('Сервер запущено');
