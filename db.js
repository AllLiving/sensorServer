var mysql = require('mysql');
const moment = require('moment');

const sensor = mysql.createPool({
    connectionLimit: 10,
    host: '120.79.94.53',
    user: 'usr',
    password: '123',
    database: 'Sensor',
    dateStrings: 'DATETIME'
});

var operateTable = (table) => {
    return {
        select: (obj, callback) => {
            var sql = 'select * from ' + table.name;
            if (obj.idxs) {
                sql += ' where ';
                for (var idx of obj.idxs) {
                    sql += idx.key + ' = ' + idx.value + ' and ';
                }
                sql = sql.substr(0, sql.length - 5);
            }
            sensor.getConnection((err, conn) => {
                if (err) console.log(err);
                else conn.query(sql, (err, results, fields) => {
                    conn.release();
                    return callback(err, results, fields);
                });
            });
        },
        insert: (obj, callback) => {
            var sql = 'insert into ' + table.name + ' value(';
            for (var col of obj.cols) {
                sql += col.value + ',';
            }
            sql = sql.substr(0, sql.length - 1);
            sql += ');';
            sensor.getConnection((err, conn) => {
                if (err) console.log(err);
                else conn.query(sql, (err, results, fields) => {
                    conn.release();
                    return callback(err, results, fields);
                });
            });
        },
        update: (obj, callback) => {
            var sql = 'update ' + table.name + ' set ';
            for (var col of obj.cols) {
                sql += col.key + ' = ' + col.value + ',';
            }
            sql = sql.substr(0, sql.length - 1) + ' where ';
            for (var idx of obj.idxs) {
                sql += col.key + ' = ' + col.value + ' and ';
            }
            sql = sql.substr(0, sql.length - 5);
            sensor.getConnection((err, conn) => {
                if (err) console.log(err);
                else conn.query(sql, (err, results, fields) => {
                    conn.release();
                    return callback(err, results, fields);
                });
            });
        },
        del: (obj, callback) => {
            var sql = 'delete from ' + table.name;
            if (obj.idxs) {
                sql += ' where ';
                for (var idx of obj.idxs) {
                    sql += idx.key + ' = ' + idx.value + ' and ';
                }
                sql = sql.substr(0, sql.length - 5);
            }
            sensor.getConnection((err, conn) => {
                if (err) console.log(err);
                else conn.query(sql, (err, results, fields) => {
                    conn.release();
                    return callback(err, results, fields);
                });
            });
        }
    }
};

module.exports = operateTable;