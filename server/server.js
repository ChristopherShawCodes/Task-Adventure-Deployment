
const express = require('express')
const app = express() 
const port = 8000
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config()
require('./config/mongoose.config')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
    cors({
        origin: 'http://localhost:3000',
        // origin: 'https://task-adventure-app.netlify.app',
        credentials: true
    }),
)


app.use(cookieParser())


require('./routes/task.routes')(app)
require('./routes/user.routes')(app)



app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})