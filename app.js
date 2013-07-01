var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    express = require('express'),
    mongoose = require('mongoose');

/*
 * DATABASE CONFIGURATION
 */
var formatMongoUrl = function (parts) {
    var res = 'mongodb://';
    if (parts.username) {
        res += parts.username;
        if (parts.password) {
            res += ':' + parts.password;
        }
        res += '@';
    }
    res += parts.hostname;
    if (parts.port) {
        res += ':' + parts.port;
    }
    res += '/';
    if (parts.database) {
        res += parts.database;
    }
    return res;
};
var url = formatMongoUrl({
    username: (process.env.MONGO_USER) || '',
    password: (process.env.MONGO_PASSWORD) || '',
    hostname: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DB || 'photo-diary'
});
console.log('Connecting to %s', url);
mongoose.connect(url, function (error, connection) {
    if (error) {
        console.error('Error while connecting to MongoLab: %s', error);
        process.exit(-1);
    }
});
mongoose.set('debug', true);
var photoSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    title: String,
    location: {
        lng: {
            type: Number,
            min: -180,
            max: 180
        },
        lat: {
            type: Number,
            min: -90,
            max: 90
        }
    },
    filename: String,
    date: {
        type: Date,
        default: Date.now
    }
});
photoSchema.index({ location: '2d' });
var Photo = mongoose.model('Photo', photoSchema);

/*
 * APPLICATION CONFIGURATION
 */
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: path.join(__dirname, 'public/uploads')
}));
app.use(express.methodOverride());
var CORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(CORS);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.post('/photos', function (req, res) {
    var location = req.body.location.split(',');
    var photo = new Photo();
    photo.title = req.body.title;
    photo.location = { lng: parseFloat(location[1]), lat: parseFloat(location[0]) };
    photo.filename = path.basename(req.files.photo.path);
    photo.save();
    res.json(photo);
});

/**
 * Get photos within a bouding box
 * /photos/<lat_lo>,<lng_lo>,<lat_hi>,<lng_hi>
 */
app.get('/photos/within/:lat_lo,:lng_lo,:lat_hi,:lng_hi', function (req, res) {
    Photo.find({
        location: {
            $geoWithin: {
                $box: [
                    [parseFloat(req.params.lng_lo), parseFloat(req.params.lat_lo)], // bottom-left corner
                    [parseFloat(req.params.lng_hi), parseFloat(req.params.lat_hi)]  // top-right corner
                ]
            }
        }
    }, function (error, photos) {
        if (error) {
            console.error(error);
            res.json(500, {
                error: error
            });
            return;
        }
        res.json(photos);
    });
});


app.get('/photos/:photo', function (req, res) {
    Photo.findById(req.params.photo, function (error, photo) {
        if (error) {
            console.error(error);
            res.json(500, {
                error: error
            });
            return;
        }
        res.json(photo);
    });
});

app.post('/photos/:photo', function (req, res) {

});

app.delete('/photos/:photo', function (req, res) {

});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});