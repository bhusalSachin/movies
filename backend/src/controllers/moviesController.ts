import { Request, Response } from 'express';
import { MovieModel } from '../models/moviesModel';
import { Movie } from '../models/types';

const movieModel = new MovieModel();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 movies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *   post:
 *     summary: Add a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created
 *
 * /movies/{id}:
 *   put:
 *     summary: Edit a movie
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to edit
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated
 *       404:
 *         description: Movie not found
 *
 *   delete:
 *     summary: Delete a movie
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         genre:
 *           type: string
 *         year:
 *           type: integer
 *         imageUrl:
 *           type: string
 */
export const getMovies = (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;
    const movies = movieModel.getAllMovies(page, limit);
    res.json({ page, movies });
};

export const addMovie = (req: Request, res: Response) => {
    const movie = req.body as Omit<Movie, 'id'>;
    const newMovie = movieModel.addMovie(movie);
    res.status(201).json(newMovie);
};

export const editMovie = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedMovie = req.body as Omit<Movie, 'id'>;
    const movie = movieModel.editMovie(id, updatedMovie);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};

export const deleteMovie = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const success = movieModel.deleteMovie(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};
