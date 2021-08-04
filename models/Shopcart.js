const mongoose = require('mongoose');

const Shopcartobj = new mongoose.Schema({
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
    }  
})


module.exports = shopcart = mongoose.model('shopcart',Shopcartobj);