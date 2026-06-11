// db.js — koneksi ke PostgreSQL
const { Pool } = require('pg');

// Pool = kumpulan koneksi yang dikelola otomatis
// Lebih efisien daripada buat koneksi baru setiap request
const pool = new Pool({
  host: process.env.DB_HOST,       // nama container database
  port: process.env.DB_PORT,       // port PostgreSQL (default 5432)
  database: process.env.DB_NAME,   // nama database
  user: process.env.DB_USER,       // username database
  password: process.env.DB_PASSWORD // password database
});

// Test koneksi saat pertama kali dijalankan
pool.connect((err) => {
  if (err) {
    console.error('❌ Gagal koneksi ke database:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke database tasks');
  }
});

module.exports = pool;
