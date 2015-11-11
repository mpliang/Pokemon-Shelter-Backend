var express = require('express');
var router = express.Router();

var Animal = require('../models/animal')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Animal.find(function(err, data){
    console.log(data);
    res.send(data);
  });
});

router.delete('/', function(req, res, next) {
    // console.log(Animal.find(req.body));
    Animal.find(req.body).remove(function(err,data){
      res.send(data);
    });
});

//router.delete('/:animalId', function(req, res) {
//   Animal.findByIdAndRe=move(req.params.animalId, function(err, deletedAnimal){
//     res.status(err ? 400 : 200).send(err || deletedAnimal)
//   })
// })

router.post('/', function(req, res, next) {
  Animal.create(req.body, function(err,savedAnimal){
    res.status(err ? 400 : 200).send(err || savedAnimal);
  });
});

router.put('/:animalId/toggle', function(req,res) {
  Animal.findById(req.params.animalId, function(err, animal) {
    animal.isAvailable = !animal.isAvailable;
    animal.save(function(err, savedAnimal){
      res.send(savedAnimal);
    });
  });
});

module.exports = router;
