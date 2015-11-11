var mongoose = require('mongoose');

var trainerSchema = mongoose.Schema({
  name: {type: String, required: true},
  gender: {type: String, required: true},
  url: {type: String, required: true},
  description: String,
  pets: [{type: mongoose.Schema.ObjectId, ref: 'Animal'}]
});
 var Trainer = mongoose.model('Trainer', trainerSchema);

 module.exports = Trainer;
//////////////////////////

// Trainer.findOne({....}), function(err, trainer){
//   Animal.findOne({.....}), function(err, pet){
//     trainer.pets.push(pet._id);
//     pet.isAvailable = false;
//     trainer.save(function(err, savedTrainer){
//       res.send();
//     });
//     pet.save(function(err, savedPet){
//       res.send();
//     });
//   }
// }

// Client.find({}).populate('pets').exec(function(err, clients) {
//
// });
//
// Animal.findById(animalId, function(err, pet){
//   Client.findById(clientId, function(err, client){
//     client.pets.push(pet._id);
//     pet.isAvailable = false;
//     pet.save(function(err, savedPet){
//       client.save(function(err, savedClient){
//         res.send();
//       });
//     });
//   });
// });
