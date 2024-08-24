const mongoose = require('mongoose');
const { Schema } = mongoose;


const reviewSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    content: { type: String, required: true },
    createdOn: { type: Date, required: true }, 
    starts: {type: Number, required: true}
})

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;