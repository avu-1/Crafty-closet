// backend/config/db.js
const mysql = require('mysql2/promise');

// Allow connection via URL string (Railway/Render) or separate variables
const dbConfig = process.env.MYSQL_URL || process.env.DATABASE_URL
  ? process.env.MYSQL_URL || process.env.DATABASE_URL
  : {
      host:               process.env.DB_HOST     || 'localhost',
      port:               parseInt(process.env.DB_PORT || '3306'),
      user:               process.env.DB_USER     || 'root',
      password:           process.env.DB_PASSWORD || '',
      database:           process.env.DB_NAME     || 'crafty_closet_v2',
      waitForConnections: true,
      connectionLimit:    10,
      queueLimit:         0,
      charset:            'utf8mb4',
      timezone:           '+00:00',
    };

const pool = mysql.createPool(dbConfig);

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log(`✅  MySQL connected → ${process.env.DB_NAME || 'crafty_closet_v2'}`);
    conn.release();
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    Check DB_HOST, DB_USER, DB_PASSWORD, DB_NAME in your .env file');
    process.exit(1);
  });

module.exports = pool;
