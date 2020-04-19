const express = require('express');
const router = express.Router();

// Models

const Movie = require("../models/Movie");

router.get('/', (req, res, next) => {

  const allMovies = Movie.find({});
  allMovies.then((data) => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  })

});


router.get('/top10', (req, res) => {

  const top10 = Movie.find({}).limit(10).sort({imdb_score: -1});
  top10.then((data) => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  })

});



router.get('/:movie_id', (req, res, next) => {
  
  const data = Movie.findById(req.params.movie_id);

  data.then((movie) => {
    if(!movie){
      next({message: "Listelenecek film bulunamadı.", code: 99});
    }
    res.json(movie);
  }).catch(err => {
    res.json(err);
  })

});

router.put('/:movie_id', (req, res, next) => {
  
  const data = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true});

  data.then((movie) => {
    if(!movie){
      next({message: "Listelenecek film bulunamadı.", code: 99});
    }
    res.json(movie);
  }).catch(err => {
    res.json(err);
  })

});

router.delete('/:movie_id', (req, res, next) => {
  
  const data = Movie.findByIdAndRemove(req.params.movie_id, req.body);

  data.then((movie) => {
    if(!movie){
      next({message: "Listelenecek film bulunamadı.", code: 99});
    }
    res.json({status: 1});
  }).catch(err => {
    res.json(err);
  })

});

router.post('/', (req, res, next) => {
 
  const movie = new Movie(req.body)

  const addData = movie.save();
  addData.then((data) => {
    res.json({status: 1});
  }).catch(err => {
    res.json(err);
  })

});

router.get('/between/:start_year/:end_year', (req, res) => {

  const { start_year, end_year } = req.params;
  const allMovies = Movie.find(
    {
      year: { "$gte" : parseInt(start_year), "$lte" : parseInt(end_year) }
    }
  );
  allMovies.then((data) => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  })

});


module.exports = router;
