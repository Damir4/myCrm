const app = require('./app.js');
const key = require('./config/keys')
const mongo = require('mongoose')



async function start() {
   try{ 
    await mongo.connect(key.mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    app.listen(5000,()=>{
        console.log('Start server...')
    })
}
    catch(err){
        console.log(err)
    }
}

start()

