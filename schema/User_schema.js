var mongoose = require('mongoose');

var user = new mongoose.Schema({

    Userid:{
        type:String
    },
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Pwd: {
        type: String
    },
    Address: {
        type: String
    },
    Role:{
        type:String,
        default:"User"
    }

})
module.exports = mongoose.model('user', user);