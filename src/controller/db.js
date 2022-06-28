const mariadb = require('mariadb');


const pool = mariadb.createPool({                                                                                                                                     
    host: '127.0.0.1', 
    user:'amujhon_01', 
    password: 'FdDwxxIIc_Wdgkrd',
    database : 'db_practica',
    port:3306
});

pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
});

module.exports = pool;