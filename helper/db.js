const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb://mehmetcuci:ornekdb@cluster0-shard-00-00-0xiky.mongodb.net:27017,cluster0-shard-00-01-0xiky.mongodb.net:27017,cluster0-shard-00-02-0xiky.mongodb.net:27017/movie-api?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
    
    mongoose.connection.on("open", () => {
        console.log("MongoDB Connected.");
    });

    mongoose.connection.on("error", (error) => {
        console.log("MongoDB Error:", error);
    });

    mongoose.Promise = global.Promise;

}