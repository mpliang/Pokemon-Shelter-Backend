var express = require('express');
var router = express.Router();

var Trainer = require('../models/trainer');
var Animal = require('../models/animal');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Trainer.find({}, function(err, data){
    console.log(data);
    res.status(err ? 400 : 200).send(err || data);
  }).populate('pets', 'name');
});

// router.delete('/', function(req, res, next) {
//     console.log(Trainer.find(req.body));
//     Trainer.fin d(req.body).remove(function(err,data){
//       res.send(data);
//     });
// });

router.delete('/:trainerId', function(req, res) {
  Trainer.findByIdAndRemove(req.params.trainerId, function(err, deletedTrainer){
    res.status(err ? 400 : 200).send(err || deletedTrainer)
  });
});

router.post('/', function(req, res, next) {
  Trainer.create(req.body, function(err,savedTrainer){
    res.status(err ? 400 : 200).send(err || savedTrainer);
  });
});

router.put('/:trainerId/adopt/:pokemonId', function(req,res) {
  // req.body.clientId
  // req.body.animalId
  Trainer.findById(req.params.trainerId, function(err, trainer){
    Animal.findById(req.params.pokemonId, function(err, animal){
      if(trainer.pets.indexOf(req.params.animalId) !== -1) {
        res.status(400).send('you already have that animal!')
      } else {
        trainer.pets.push(animal);
        animal.isAvailable = false;
        trainer.save(function(err,savedTrainer){
          animal.save(function(err, savedAnimal){
            res.send(savedTrainer);
          });
        });
      }
    });
  });
});

router.put('/:trainerId/unadopt/:animalId', function(req,res) {
  Trainer.findById(req.params.trainerId, function(err, client){
    Animal.findById(req.params.animalId, function(err, animal){
      if(trainer.pets.indexOf(req.params.animalId) !== -1) {
        res.status(400).send('you already have that animal!')
      } else {
        trainer.pets.push(animal);
        animal.isAvailable = true;
        trainer.save(function(err,savedTrainer){
          animal.save(function(err, savedAnimal){
            res.send(savedTrainer);
          });
        });
      }
    });
  });
});

router.get('/:trainerId', function(req, res) {
  Trainer.findById(req.params.trainerId, function(err, client){
    console.log('test');
    res.send(client);
  }).populate('pets');
});

router.put('/:trainerId/toggle', function(req,res) {
  Trainer.findById(req.params.trainerId, function(err, trainer) {
    trainer.isAvailable = !trainer.isAvailable;
    trainer.save(function(err, savedTrainer){
      res.send(savedTrainer);
    });
  });
});

///adopt?animalId=234092903428&trainerId=2340283948209
// router.put('/adopt', function(req, res){
//   res.send(req.query.animalId);
// });

module.exports = router;
