var express = require('express');
var db = require('./lib/mongodb.js');

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

/*https://www.googleapis.com/customsearch/v1?q=cats&cx=008904864964481697880%3Auwiuhoorfda&searchType=image&key={YOUR_API_KEY}

var request = require('request');
request('http://localhost:6000', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the body of response.
  }
})*/

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Image search abstraction layer microservice',
        message: 'Image search abstraction layer microservice'
    });
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('app listening on port ' + port);
});
