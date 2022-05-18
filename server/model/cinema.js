const mongoose = require('mongoose');
Schema = mongoose.Schema
const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },

  city:{
    type: Schema.Types.ObjectId,
    ref: 'location',
    required: true
  }

});

module.exports = mongoose.model('cinema', cinemaSchema);;