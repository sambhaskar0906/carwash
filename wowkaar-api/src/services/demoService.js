const Demo = require("../models/demoModel")

exports.upload=async(data)=>{
    return Demo.create()
}