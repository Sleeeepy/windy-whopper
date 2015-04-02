'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FlightSchema = new Schema({
  userID: {type: Schema.Types.ObjectId, ref: 'User'},
  org: String,
  dest: String,
  orgID: {type: Schema.Types.ObjectId, ref: 'Airport'},
  destID: {type: Schema.Types.ObjectId, ref: 'Airport'},
  dep: Date,
  arr: Date,
  active: Boolean
});

module.exports = mongoose.model('Flight', FlightSchema);
