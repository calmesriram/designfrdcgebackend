var mongoose = require('mongoose');

var product = new mongoose.Schema({

    Pid:{
        type:String
    },
    Pname: {
        type: String
    },
    Pdate: {
        type: String
    },
    Pqty: {
        type: Number
    },
    Prate: {
        type: Number
    }

})
module.exports = mongoose.model('product', product);