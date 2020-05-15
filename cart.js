var mongoose = require('mongoose');

var cartschema = new mongoose.Schema({

   id:{
       type:Number
   },
   productname:{
       type:String
   },
   product_id:{
       type:String,unique:true
   },
   quantity:{
       type:Number
   },
   address:{
       type:String
   },
   amount:{
       type:Number
   },
   percentage:{
    type:String
   },
   description:{
    type:String
    }   
  
})
module.exports=mongoose.model('cartinfo',cartschema);

