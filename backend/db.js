const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"


const connectToMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log("Mongo connection successful");
    })
}

module.exports = connectToMongo;