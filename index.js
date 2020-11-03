console.clear();

const app = require('express')()

require('express-async-errors');
require('./startup/mongodb').mongoDBConnection();
require('./startup/routes')(app);

const port   = process.env.PORT || 3000;
const server = app.listen(port,() => {
    console.info(`ToDo service running on port ${port}`)
})

module.exports = server;