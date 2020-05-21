var mongoose = require('mongoose');

var Order = new mongoose.Schema({

    Pid:{
        type:String
    },
    Pname: {
        type: String
    },
    Pqty: {
        type: String
    },
    Prate: {
        type: String
    },
    Userid: {
        type: String
    },
    Orderdate:{
        type:String
    },
    Pimg:{
        type:String
    },    
    Ppayment:{
        type:Boolean
    }
})
module.exports = mongoose.model('orderdetails', Order);