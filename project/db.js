require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// проверка подключения
pool.connect()
  .then(() => {
    console.log('✅ Подключение к БД успешно');
  })
  .catch(err => {
    console.error('❌ Ошибка подключения к БД:', err.message);
  });

module.exports = pool;