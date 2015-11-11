var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var animalSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  species: {type: String, required: true},
  gender: {type: String, required: true, default: 'unknown'},
  isAvailable: {type: Boolean, required: true, default: false},
  url: String,
  description: {type: String, default: 'n/a'}
  // createdAt: {type: Date, default: Date.now()},
});

animalSchema.method.toggleAvailable = function(cb) {
  this.isAvailable = !this.isAvailable;
  this.save(cb);
};

var Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
