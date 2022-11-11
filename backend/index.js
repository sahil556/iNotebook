const connectToMongo = require('./db')
var cors = require('cors');

connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(cors())
// to use request.body 
app.use(express.json())

// avilable routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`InoteBook Backend listening on port ${port}`)
})