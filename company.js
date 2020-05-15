var mongoose = require('mongoose');

var companyschema = new mongoose.Schema({

   id:{
       type:Number
   },
   gstnum:{
       type:String
   },
   company_address:{
       type:String
   },
   company_name:{
       type:String
   }
  
})
module.exports=mongoose.model('companyinfo',companyschema);


//  GSTNo, company_address, company_name