const pool = require('../database');

class ParcelModel {
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS parcels (
        id SERIAL PRIMARY KEY,
        parcel_number TEXT NOT NULL
      );
    `;
    try {
      await pool.query(query);
      console.log("parcels table created successfully!");
    } catch (err) {
      console.error("Error creating parcels table:", err);
    }
  }

  async addParcel(parcelNumber) {
    const query = `INSERT INTO parcels (parcel_number) VALUES ($1)`;
    try {
      await pool.query(query, [parcelNumber]);
      console.log("Parcel added successfully!");
    } catch (err) {
      console.error("Error adding parcel:", err);
    }
  }

  async getAllParcels() {
    const query = `SELECT * FROM parcels`;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error("Error getting parcels:", err);
      return [];
    }
  }
}

module.exports = new ParcelModel();
