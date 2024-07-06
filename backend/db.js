const mongoose=require("mongoose");
const { string } = require("zod");
mongoose.connect("mongodb+srv://krishaliparas:yar5R73uLpCcmiaA@cluster0.ufkpjaf.mongodb.net/")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:35
    },
    lastName:{
        type:String,
        trim:true,
        maxLength:35
    }

});
const accountSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const Account=mongoose.model('Account',accountSchema);
const User=mongoose.model('User',userSchema);
module.exports={
    User,
    Account
}