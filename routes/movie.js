const express = require('express');
const router = express.Router();

// Models

const Movie = require("../models/Movie");

router.post('/', (req, res, next) => {
  const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie({
    title,
    imdb_score,
    country,
    category,
    year
  })

  movie.save((err, data) => {
    if(err){
      return res.json(err);
    }
    else{
      return res.json(data);
    }
  })
  
});

module.exports = router;
