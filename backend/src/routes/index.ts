import { Router } from 'express';
import { getMovies, addMovie, editMovie, deleteMovie } from '../controllers/moviesController';

const router = Router();

/**
 * @route GET /movies
 * @description Retrieves a paginated list of movies.
 * @access Public
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get('/movies', getMovies);

/**
 * @route POST /movies
 * @description Adds a new movie to the collection.
 * @access Public
 * @param {Request} req - The request object containing the new movie data.
 * @param {Response} res - The response object.
 */
router.post('/movies', addMovie);

/**
 * @route PUT /movies/:id
 * @description Edits an existing movie by its ID.
 * @access Public
 * @param {Request} req - The request object containing the movie ID and updated data.
 * @param {Response} res - The response object.
 */
router.put('/movies/:id', editMovie);

/**
 * @route DELETE /movies/:id
 * @description Deletes a movie by its ID.
 * @access Public
 * @param {Request} req - The request object containing the movie ID.
 * @param {Response} res - The response object.
 */
router.delete('/movies/:id', deleteMovie);

export default router;
