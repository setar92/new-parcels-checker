const pool = require('../database');

class ChatIdModel {
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS chatId (
        id SERIAL PRIMARY KEY,
        chatId VARCHAR(255) UNIQUE NOT NULL
      );
    `;
    try {
      await pool.query(query);
      console.log("Таблиця chatId створена успішно!");
    } catch (err) {
      console.error("Помилка при створенні таблиці chatId:", err);
    }
  }

  async addChatId(chatId) {
    const query = `INSERT INTO chatId (chatId) VALUES ($1)`;
    try {
      await pool.query(query, [chatId]);
      console.log("chatId успішно додано!");
    } catch (err) {
      console.error("Помилка при додаванні chatId:", err);
    }
  }

  async getAllChatIds() {
    const query = `SELECT * FROM chatId`;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error("Помилка при отриманні усіх chatId:", err);
      return [];
    }
  }

  async deleteChatId(id) {
    const query = `DELETE FROM chatId WHERE id = $1`;
    try {
      await pool.query(query, [id]);
      console.log("chatId успішно видалено!");
    } catch (err) {
      console.error("Помилка при видаленні chatId:", err);
    }
  }
}
module.exports = new ChatIdModel();