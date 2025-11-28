const express = require('express')
const app = express()
const { initializeDatabase } = require('./db/db.connect')
const fs = require('fs')
const Movie = require('./model/movie.model.js');

app.use(express.json())

initializeDatabase();

async function createMovie (newMovie) {
    try{
        const movie = new Movie(newMovie)
        const saveMovie = await movie.save()
        console.log('New Movie data', saveMovie)
    }catch(error){
        throw error
    }
}

app.post('/movies', async (req,res) => {
  try {
    const savedMovie = await createMovie(req.body)
    res.status(201).json({message: 'Movie added Successfully', movie: savedMovie})
  } catch (error) {
    res.status(500).json({error: 'Failed to add movie'})
  }
})

// ? find a movie with a particular title


async function readMovieByTitle(movieTitle) {
    try{
        const movie = await Movie.findOne({title: movieTitle})
        return movie
    }catch(error){
        throw error
    }
}

app.get('/movies/:title', async (req,res) => {
    try {
        const movie = await readMovieByTitle(req.params.title)
        if(movie){
            res.json(movie)
        }else{
            res.status(404).json({error: 'Movie not found.'})
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "Failed to fetch movie."})
    }
})

// ? to get all the movies in the database

async function readAllMovies(){
    try{
        const allMovies = await Movie.find()
        return allMovies
    }catch(error){
        throw error
    }
}

app.get('/movies', async (req, res) => {
    try {
        const movies = await readAllMovies()
        if(movies.length != 0){
            res.json(movies)
        }else{
            res.status(404).json({error: 'No movies found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch movies.'})
    }
})

// ? get movie by director name

async function readMovieByDirector(directorName){
    try{
        const movieByDirector = await Movie.find({director: directorName })
        return movieByDirector
    }catch(error){
        throw error
    }
}

app.get('/movies/director/:directorName', async (req,res) => {
    try {
        const movies = await readMovieByDirector(req.params.directorName)
        if(movies.length != 0){
            res.json(movies)
        }else{
            res.status(404).json({error: 'No movies found'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch movies.'})
    }
})


async function readMovieByGenre(genreName) {
    try {
        const movieByGenre = await Movie.find({genre: genreName})
        return movieByGenre
    } catch (error) {
        console.log(error)        
    }
}

// readMovieByGenre('Musical')

// ? find movie by id and update it's rating

async function updateMovie(movieId, dataToUpdate) {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true})
        console.log(updatedMovie)
    } catch (error) {
        console.log('Error in updating Movie rating', error)
    }
}

app.get('/movies/genres/:genreName', async (req,res) => {
    try {
        const movies = await readMovieByGenre(req.params.genreName)
        if(movies.length != 0){
            res.json(movies)
        }else{
            res.status(404).json({error: 'No movies found'})
        }
    } catch (error) {
         res.status(500).json({error: 'Failed to fetch movies.'})
    }
})

// updateMovie('68e64cfdc7da849a0c723da9', {rating: 8.9})


async function deleteMovieById(movieId){
    try {
        const deleteMovie = await Movie.findByIdAndDelete(movieId)
        return deleteMovie 
    } catch (error) {
        console.log(error)
    }
}

app.delete('/movies/:movieId', async (req, res) => {
    try {
        const deleteMovie = await deleteMovieById(req.params.movieId)
        res.status(200).json({message: 'Movie deleted successfully.', movie: deleteMovie})
    } catch (error) {
                console.error(error.message)
     res.status(500).json({error: 'Failed to Delete movie'})   
    }
})

async function updatedMovieById(movieId, dataToUpdate){
    try {
        const updateMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true})
        return updateMovie
    } catch (error) {
        console.log('Error in updating Movie rating', error);
    }
}

app.post('/movies/:movieId', async (req,res) => {
    try {
        const updatedMovie = await updatedMovieById(req.params.movieId, req.body)
        if(updateMovie) {
            res.status(200).json({message: 'Movie update successfully.'})
        }else{
            res.status(400).json({error: 'Movie not found.'})
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: 'Failed to update movie' })
    }

})


const PORT = 3001
app.listen(PORT, () => {
    console.log('Server is running on this port', PORT)
})
