var express = require('express');
var db = require('./db.js');

module.exports = (table) => {
    var operateTable = db(table);

    var route = express.Router();

    route.use((req, res, next) => next());

    route.post('/select', (req, res) => {
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded') 
            req.body.cols = JSON.parse(req.body.cols);
        if (typeof req.body.idxs === 'object') {
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
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded') 
            req.body.cols = JSON.parse(req.body.cols);
        if (typeof req.body.cols === 'object') {
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
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded') 
            req.body.cols = JSON.parse(req.body.cols);
        if (typeof req.body.cols === 'object' && typeof req.body.idxs === 'object') {
            operateTable.update(req.body, (err, results, fields) => {
                if (err) return res.send(err);
                res.send(results);
            });
        }
        else {
            res.send('err');
        }
    });

    route.post('/delete', (req, res) => {
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded') 
            req.body.cols = JSON.parse(req.body.cols);
        if (typeof req.body.idxs === 'object') {
            operateTable.del(req.body, (err, results, fields) => {
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