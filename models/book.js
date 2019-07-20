const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleBookSchema = new Schema({
    author: { type: [String], required: true },
    description: String,
    image: String,
    link: String,
    title: { type: String, required: true }
});

const googleBook = mongoose.model("Book", googleBookSchema);

module.exports = googleBook;