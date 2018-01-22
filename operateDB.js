var express = require('express');
var db = require('./db.js');

module.exports = (table) => {
    var operateTable = db(table);

    var route = express.Router();

    route.use((req, res, next) => next());

    route.post('/select', (req, res) => {
        if (typeof req.body.idxs === Object) {
            operateTable.select(req.body, (err, results, fields) => {
                if (err) return res.send(err);
                res.send(results);
            });
        }
        else {
            operateTable.select({}, (err, results, fields) => {
                if (err) return res.send(err);
                res.send(results);
            });
        }
    });

    route.post('/insert', (req, res) => {
        if (typeof req.body.cols === Object) {
            operateTable.insert(req.body, (err, results, fields) => {
                if (err) return res.send(err);
                res.send(results);
            });
        }
        else {
            res.send('err');
        }
    });

    route.post('/update', (req, res) => {
        if (typeof req.body.cols === Object && typeof req.body.idxs === Object) {
            operateTable.insert(req.body, (err, results, fields) => {
                if (err) return res.send(err);
                res.send(results);
            });
        }
        else {
            res.send('err');
        }
    });

    route.post('/delete', (req, res) => {
        if (typeof req.body.idxs === Object) {
            operateTable.insert(req.body, (err, results, fields) => {
                if (err) return res.send(err);
                res.send(results);
            });
        }
        else {
            res.send('err');
        }
    });

    return route;
};