import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid';
 import movieModel from './movieModel';
  import asyncHandler from 'express-async-handler';
  import {
    getUpcomingMovies
  } from '../tmdb-api';

  import {
    getMovies
  } from '../tmdb-api';

  import {
    getTrendingMovies
  } from '../tmdb-api';

  import {
    getTvShows
  } from '../tmdb-api';

  import {
    getTvGenres
  } from '../tmdb-api';

  import {
    getGenres
  } from '../tmdb-api';

  import {
    getMovie
  } from '../tmdb-api';




  
  








const router = express.Router(); 




router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));


// Get movie details



router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});





router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});


router.get('/tmdb/upcoming', asyncHandler( async(req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
  }));

  router.get('/tmdb/discover', asyncHandler( async(req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
  }));

  router.get('/tmdb/trending', asyncHandler( async(req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
  }));

  router.get('/tmdb/tvShows', asyncHandler( async(req, res) => {
    const tvShows = await getTvShows();
    res.status(200).json(tvShows);
  }));

  router.get('/tmdb/tvGenres', asyncHandler( async(req, res) => {
    const tvGenres = await getTvGenres();
    res.status(200).json(tvGenres);
  }));

  router.get('/tmdb/movieGenres', asyncHandler( async(req, res) => {
    const movieGenres = await getGenres();
    res.status(200).json(movieGenres);
  }));





  
  
  


 




  


  

  

  





  
  
export default router;