const mongoose = require("mongoose");
const config = require("../../config");


// DB = "mongodb+srv://softdeep065:deep1897deep@wowkaarcluster.ixuzifd.mongodb.net/wowkaarapi?retryWrites=true&w=majority"
DB = config.MONGO_URI

mongoose.connect(DB).then(() => console.log("Database connect successfull by mongodb atlas")).catch((err) => console.log(err))