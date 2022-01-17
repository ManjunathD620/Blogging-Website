const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("It is Invalid");
            }
        }
    },
    message: {
        type: String,
        required: true,
    },
    Date:{
        type: Date,
        default:Date.now
    }
    
});


const userInformation = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minLength: 3
    },
    lname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("It is Invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    Date:{
        type:Date,
        default:Date.now
    }
});



userInformation.pre('save',async function(next)
{
    try {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password,salt);
        const hashPassword1 = await bcrypt.hash(this.cpassword,salt);
        this.password = hashPassword;
        this.cpassword = hashPassword1;

    } catch (error) {
        next(error);
    }
})


const User = mongoose.model("Message", userSchema);
const UserLogin = mongoose.model("LoginInfo", userInformation);

module.exports = {User,UserLogin};