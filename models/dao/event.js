const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
    id:String,
    text:String,
    start_date:String,
    end_date:String,
})

module.exports = model('eventos', eventSchema);