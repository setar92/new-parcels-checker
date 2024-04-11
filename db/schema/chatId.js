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
      console.log("The chatId table was created successfully!");
    } catch (err) {
      console.error("Error creating chatId table:", err);
    }
  }

  async addChatId(chatId) {
    const query = `INSERT INTO chatId (chatId) VALUES ($1)`;
    try {
      await pool.query(query, [chatId]);
      console.log("chatId successfully added!");
    } catch (err) {
      console.error("Error adding chatId:", err);
    }
  }

  async getAllChatIds() {
    const query = `SELECT * FROM chatId`;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error("Error receiving all chatIds:", err);
      return [];
    }
  }

  async deleteChatId(id) {
    const query = `DELETE FROM chatId WHERE id = $1`;
    try {
      await pool.query(query, [id]);
      console.log("chatId successfully deleted!");
    } catch (err) {
      console.error("Error deleting chatId:", err);
    }
  }
}
module.exports = new ChatIdModel();