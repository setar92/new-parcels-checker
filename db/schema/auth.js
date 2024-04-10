const pool = require('../database');

class AuthTokenModel {
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS auth_tokens (
        id SERIAL PRIMARY KEY,
        token TEXT NOT NULL
      );
    `;
    try {
      await pool.query(query);
      console.log("auth_tokens table created successfully!");
    } catch (err) {
      console.error("Error creating auth_tokens table:", err);
    }
  }

  async addToken(token) {
    const query = `INSERT INTO auth_tokens (token) VALUES ($1)`;
    try {
      const result = await pool.query(query, [token]);
      const newTokenId = result.rows[0].id;
      console.log(`Token added successfully with id: ${newTokenId}`);
    } catch (err) {
      console.error("Error adding token:", err);
    }
  }

  async getAllTokens() {
    const query = `SELECT * FROM auth_tokens`;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error("Error getting tokens:", err);
      return [];
    }
  }

  async deleteAllTokens() {
    const query = `DELETE FROM auth_tokens`;
    try {
      await pool.query(query);
      console.log("All tokens deleted successfully!");
    } catch (err) {
      console.error("Error deleting all tokens:", err);
    }
  }
}

module.exports = new AuthTokenModel();