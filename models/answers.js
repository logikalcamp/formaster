const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AnswersSchema = new Schema({}, { strict: false });

module.exports = mongoose.model('Answers', AnswersSchema);