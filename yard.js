const cron = require('node-cron');
const mainlLogick = require('./helpers/check_new_parcels');



// Планування виклику функції кожні 5 хвилин
cron.schedule('*/5 * * * *', () => {
    // Перевірка часу для періоду з 22:00 до 08:00
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 8 && hour < 22) {
        mainlLogick();
    }
}, {
    timezone: 'Europe/Riga' // Встановлюємо часовий пояс Латвія (Рига)
});

console.log('Сервер запущено');
