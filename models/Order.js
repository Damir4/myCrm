const {Schema,model}= require('mongoose')

const orderSchema = new Schema({
    date:{
        type:Date,
        default:Date.now
    },
    order:{
        type:Number,
        required:true
    },
    list:[
        {
            name:{
                type:String
            },
            quantity:{
                type:String
            },
            cost:{
                type:Number
            }
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

module.exports = model('orders',orderSchema)