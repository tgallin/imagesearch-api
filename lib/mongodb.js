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
