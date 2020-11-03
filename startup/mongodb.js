
const mongoose  = require('mongoose').Mongoose

const options   = {
    useNewUrlParser:      true,
    useCreateIndex:       true,
    useFindAndModify:     false,
    // autoIndex:          false,            // Don't build indexes
    poolSize:             10,                // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries:     0,
    connectTimeoutMS:     5000,              // Give up initial connection after 10 seconds
    family:               4,                 // Use IPv4, skip trying IPv6
    useUnifiedTopology:   true,
};

mongoDB = new mongoose();

mongoDB.connection.on('reconnected', function () {
    console.info('MongoDB reconnected!');
});
mongoDB.connection.on('disconnected', function() {
    console.warn('MongoDB disconnected!');
    mongoDBConnection();
});

mongoDBConnection = function() {
    try{
        mongoDB.connect("mongodb://localhost/todo",options)
        .then (async (connection) => {
            console.info('MongoDB connected successfuly')
        })
        .catch (err => {
            console.error(err)
        });
    }
    catch(err){
        console.error(err)
    }
}

module.exports = {mongoDB}