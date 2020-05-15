var mongoose = require('mongoose');

var billschema = new mongoose.Schema({

   id:{
       type:Number
   },
   email:{
       type:String
   },
   product_id:{
       type:String
   },
   quantity:{
       type:String
   },
   postcode:{
       type:String
   },
   houseNo:{
       type:String
   },
   streetAddress:{
       type:String
   },
   mobile:{
       type:Number
   }
  
})
module.exports=mongoose.model('billinfo',billschema);


