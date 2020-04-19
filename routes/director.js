const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const Director = require("../models/Director");

router.get('/', (req, res) => {
    const data = Director.aggregate([
        {
             $lookup: {
                 from: 'movies',
                 localField: '_id',
                 foreignField: 'director_id',
                 as: 'movies'
             }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'

            }
        }
    ])

    data.then((result) => {
        res.json(result);
    }).catch(err => res.json(err));
});

router.get('/:director_id', (req, res) => {
    const data = Director.aggregate([
        {
            $match: {
                '_id' : mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
             $lookup: {
                 from: 'movies',
                 localField: '_id',
                 foreignField: 'director_id',
                 as: 'movies'
             }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'

            }
        }
    ])

    data.then((result) => {
        res.json(result);
    }).catch(err => res.json(err));
});

router.put('/:director_id', (req, res, next) => {
  
    const data = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true});
  
    data.then((director) => {
      if(!director){
        next({message: "Yönetmen bulunamadı.", code: 99});
      }
      res.json(director);
    }).catch(err => {
      res.json(err);
    })
  
  });
  
  router.delete('/:director_id', (req, res, next) => {
  
    const data = Director.findByIdAndRemove(req.params.director_id, req.body);
  
    data.then((director) => {
      if(!director){
        next({message: "Yönetmen bulunamadı.", code: 99});
      }
      res.json({status: 1});
    }).catch(err => {
      res.json(err);
    })
  
  });

router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const addData = director.save();
  addData.then((data) => {
      res.json(data);
  }).catch(err => res.json(err))
});

router.get('/', (req, res) => {
    Director.find({})
})
module.exports = router;
