const mysql = require('mysql2');
const fs = require('fs');

const sql = fs.readFileSync('../database_backup.sql', 'utf8');

const conn = mysql.createConnection({
    host: 'acela.proxy.rlwy.net',
    port: 58438,
    user: 'root',
    password: 'QHHVRVMEDcKHruZDcRfCIOrCXDPQOall',
    database: 'railway',
    multipleStatements: true
});

conn.query(sql, (err) => {
    if (err) { console.error('Import error:', err.message); process.exit(1); }
    else { console.log('Database imported successfully!'); }
    conn.end();
});
