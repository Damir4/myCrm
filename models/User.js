const {Schema,model}= require('mongoose')
const path = require('path')
const urlImg = path.join('uploads','defolt.jpg')
const userSchema = new Schema({
    name:{
        type:String,
        default:'admin'
    },
    imgSrc:{
        type:String,
        default:urlImg
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
})

module.exports = model('users',userSchema)