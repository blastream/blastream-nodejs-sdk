require('babel-register')({
    "presets": [ 'env' ],
    "plugins": [
        "wildcard",
        "transform-runtime"
    ]
})

// Import the rest of our application.
module.exports = require('./index.js')