var express = require('express');
var bodyParser = require('body-parser');
const moment = require('moment');
var operateDB = require('./operateDB.js')

var car = operateDB({name: 'car'});
var fleet = operateDB({name: 'fleet'});
var history_route = operateDB({name: 'history_route'});
var maintenance = operateDB({name: 'maintenance'});
var refuel = operateDB({name: 'refuel'});
var route = operateDB({name: 'route'});
var user = operateDB({name: 'user'});

var app = express();

app.use(express.static('.'));

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => res.send('apple')
);

app.use('/car', jsonParser, urlencodedParser, car);

app.use('/fleet', jsonParser, urlencodedParser, fleet);

app.use('/history_route', jsonParser, urlencodedParser, history_route);

app.use('/maintenance', jsonParser, urlencodedParser, maintenance);

app.use('/refuel', jsonParser, urlencodedParser, refuel);

app.use('/route', jsonParser, urlencodedParser, route);

app.use('/user', jsonParser, urlencodedParser, user);

app.listen(3000, function () {
    var host = this.address().address;
    var port = this.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});