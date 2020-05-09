const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const ScrapedDataSchema = new Schema({

    manufacturerId:{
        type:String
    },
    
    engine:{
        type:String
    },

    modelId:{
        type:String
    },

    modelName:{
        type:String
    },


    manufacturerName:{
        type:String
    },

    counter:{
        type:Number
    },

    type:{
        type:String
    }


});


module.exports = ScrapedData = mongoose.model('scraped_objects',ScrapedDataSchema);