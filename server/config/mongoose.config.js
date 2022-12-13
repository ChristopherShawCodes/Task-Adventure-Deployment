const mongoose = require('mongoose')
// const db = process.env.SECRET_KEY
const db ='Task-App'


mongoose.connect(`mongodb://localhost/${db}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log(`Connection to Mongo DB Cloud successful`)
}).catch((err) =>{
    console.log(`Unable to connect to ${db}`)
})