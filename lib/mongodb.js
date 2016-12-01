//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var mongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
// local db :
//var dburl = 'mongodb://' + process.env.IP + ':27017/imagesearch';
// db hosted by mLab
// export MONGOLAB_URI="mongodb://user:password@ds015928.mlab.com:15928/imagesearch"
var dburl = process.env.MONGOLAB_URI;

var HISTORY_COLLECTION = "history";

var saveSearch = function(query) {
    mongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', dburl);

            var col = db.collection(HISTORY_COLLECTION);
            var search = {
                query: query,
                time: new Date()
            };
            col.insert(search, function(err, data) {
                if (err) {
                    console.log(err);
                }
                close(db);
            });
        }
    });
};

var getRecentSearches = function(res, callback) {
    mongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log(err);
            callback('Unable to connect to the mongoDB server.', res, null);
        }
        else {
            console.log('Connection established to', dburl);

            var col = db.collection(HISTORY_COLLECTION);
            col.find({}, {
                query: 1,
                time: 1,
                _id: 0
            }).sort({
                time: -1
            }).limit(10).toArray(function(err, searches) {
                if (err) {
                    console.log(err);
                    callback(err, res, null);
                    close(db);
                }
                else {
                    callback(err, res, searches);
                    close(db);
                }
            });
        }
    });
};

module.exports.saveSearch = saveSearch;
module.exports.getRecentSearches = getRecentSearches;

function close(db) {
    //Close connection
    console.log('closing connection');
    db.close();
}
