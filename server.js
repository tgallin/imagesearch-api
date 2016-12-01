var express = require('express');
var request = require('request');
var db = require('./lib/mongodb.js');

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
var CUSTOM_SEARCH_ENGINE_ID = process.env.CUSTOM_SEARCH_ENGINE_ID;
var RESULTS_PER_PAGE = 10;

function search(query, offset, res) {
    // cx : The custom search engine ID to scope this search query
    // key : google api key
    // num : Number of search results to return (integer)
    // start: The index of the first result to return (integer)

    var params = '';
    params += '&q=' + query;
    params += '&cx=' + CUSTOM_SEARCH_ENGINE_ID;
    params += '&key=' + GOOGLE_API_KEY;
    params += '&num=' + RESULTS_PER_PAGE;
    if (offset) {
        var numPage = Number.parseInt(offset, 10);
        if (!isNaN(numPage)) {
            params += '&start=' + ((RESULTS_PER_PAGE * numPage) + 1);
        }
    }

    db.saveSearch(query);
    // get the image URLs, alt text and page urls from the google custom search results

    request('https://www.googleapis.com/customsearch/v1?searchType=image' + params, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var images = [];
            var result = JSON.parse(body);
            result.items.forEach(function(i) {
                var image = {
                    url: i.link,
                    snippet: i.snippet,
                    thumbnail: i.image.thumbnailLink,
                    context: i.image.contextLink
                };
                images.push(image);
            });
            res.json(images);
        }
        else {
            res.end(error);
        }
    });
}

app.get('/search/:query', function(req, res) {
    var q = req.params.query;
    var offset = req.query.offset;
    search(q, offset, res);
});

function displayLatest(err, res, searches) {
    if (err) {
        res.end('there was a problem trying to get the latest searches. ' + err);
    }
    else {
        if (searches && searches.length > 0) {
            res.json(searches);
        }
        else {
            res.end('No search has been made yet.');
        }
    }
}

app.get('/latest', function(req, res) {
    db.getRecentSearches(res, displayLatest);
});

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
