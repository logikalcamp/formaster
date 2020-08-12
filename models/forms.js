const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var FormSchema = new Schema({}, { strict: false });

module.exports = mongoose.model('Form',FormSchema);