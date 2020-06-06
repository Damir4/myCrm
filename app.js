const express = require('express');
const app = express();
const authRout = require('./routes/auth')
const orderRout = require('./routes/order')
const categoryRout = require('./routes/category')
const positionRout = require('./routes/position')
const analyticsRout = require('./routes/analytics')
const bodyParser = require("body-parser")
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const userRout = require('./routes/user')

app.get('/',(req,res)=>{
    res.write('Hellou World')
    res.end()
})

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/api/auth',authRout)
app.use('/api/order',orderRout)
app.use('/api/category',categoryRout)
app.use('/api/position',positionRout)
app.use('/api/analytics',analyticsRout)
app.use('/api/user',userRout)
app.use(passport.initialize())
require('./middleware/passport')(passport)
        
module.exports = app 