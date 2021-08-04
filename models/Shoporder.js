const mongoose = require('mongoose');

const Shoporderobj = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'shopuser'
    },
    title : {
        type : String,
        required : true
    },
    imagename :{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    address :{
        type:String,
        required : true
    }  
})


module.exports = shoporder = mongoose.model('shoporder',Shoporderobj);