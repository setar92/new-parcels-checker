const mainlLogick = require('./helpers/check_new_parcels');
require('dotenv').config()
async function scheduleFunction() {
    const now = new Date();
    const hour = now.getHours();
    
    // Перевіряємо, чи поточний час не знаходиться в періоді з 22:00 до 08:00
    if (hour >= 8 && hour < 22) {
        await mainlLogick();
    }
    
    // Запускаємо таймер для наступного виклику через 5 хвилин
    setTimeout(scheduleFunction, 0.5 * 60 * 1000);
}

// Початковий запуск
scheduleFunction();
