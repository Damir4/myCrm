const {Schema,model}= require('mongoose')

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    imageSrc:{
        type:String,
        default:""
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
    }
})

module.exports = model('categories',categorySchema)