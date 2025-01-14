const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'admin_system',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

db.query('SELECT * FROM your_table', (err, results) => {
  if (err) {
    console.error('Query failed:', err.message);
  } else {
    console.log('Results:', results);
  }
});

db.end();
