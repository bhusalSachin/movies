import * as fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { Movie } from './types';

const CSV_FILE_PATH = 'src/data/movies_db.csv';

/**
 * @class MovieModel
 * @description Handles movie data, including loading, adding, editing, and deleting movies from a CSV file.
 */
export class MovieModel {
    private movies: Movie[] = []; // Array to store movies.
    private nextId: number = 1; // Tracks the next available ID for a new movie.

    /**
     * @constructor
     * @description Initializes the MovieModel and loads movies from the CSV file.
     */
    constructor() {
        this.loadMovies(); // Load movies when the model is created.
    }

    /**
     * @private
     * @function loadMovies
     * @description Loads movies from the CSV file and populates the movies array.
     * @returns {void}
     */
    private loadMovies() {
        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csv({ headers: ['name', 'genre', 'year', 'imageUrl'], skipLines: 1 })) // Skip the header line.
            .on('data', (row: any) => {
                this.movies.push({
                    id: this.nextId++, // Assigns a new ID to the movie.
                    name: row.name,
                    genre: row.genre,
                    year: parseInt(row.year), // Parses the year as an integer.
                    imageUrl: row.imageUrl
                });
            })
            .on('end', () => {
                console.log('CSV file successfully processed.'); // Log when the file processing is complete.
            });
    }

    /**
     * @function getAllMovies
     * @description Retrieves a paginated list of movies.
     * @param {number} page - The current page number.
     * @param {number} limit - The maximum number of movies to return per page.
     * @returns {Movie[]} - An array of movies for the specified page.
     */
    public getAllMovies(page: number, limit: number): Movie[] {
        const startIndex = (page - 1) * limit; // Calculates the starting index based on the current page.
        return this.movies.slice(startIndex, startIndex + limit); // Returns a slice of movies for the current page.
    }

    /**
     * @function addMovie
     * @description Adds a new movie to the collection and saves it to the CSV file.
     * @param {Omit<Movie, 'id'>} movie - The movie data without an ID.
     * @returns {Movie} - The newly created movie object with an ID.
     */
    public addMovie(movie: Omit<Movie, 'id'>): Movie {
        const newMovie = { ...movie, id: this.nextId++ }; // Creates a new movie object with a unique ID.
        this.movies.push(newMovie); // Adds the new movie to the movies array.
        this.saveMovies(); // Saves the updated movie list to the CSV file.
        return newMovie; // Returns the newly created movie.
    }

    /**
     * @function editMovie
     * @description Edits an existing movie in the collection by its ID.
     * @param {number} id - The ID of the movie to edit.
     * @param {Omit<Movie, 'id'>} updatedMovie - The updated movie data without an ID.
     * @returns {Movie | null} - The updated movie object if found, otherwise null.
     */
    public editMovie(id: number, updatedMovie: Omit<Movie, 'id'>): Movie | null {
        const index = this.movies.findIndex(movie => movie.id === id); // Finds the index of the movie to edit.
        if (index !== -1) {
            this.movies[index] = { ...this.movies[index], ...updatedMovie }; // Updates the movie data.
            this.saveMovies(); // Saves the updated movie list to the CSV file.
            return this.movies[index]; // Returns the updated movie.
        }
        return null; // Returns null if the movie was not found.
    }

    /**
     * @function deleteMovie
     * @description Deletes a movie from the collection by its ID.
     * @param {number} id - The ID of the movie to delete.
     * @returns {boolean} - True if the movie was deleted, otherwise false.
     */
    public deleteMovie(id: number): boolean {
        const index = this.movies.findIndex(movie => movie.id === id); // Finds the index of the movie to delete.
        if (index !== -1) {
            this.movies.splice(index, 1); // Removes the movie from the array.
            this.saveMovies(); // Saves the updated movie list to the CSV file.
            return true; // Returns true to indicate successful deletion.
        }
        return false; // Returns false if the movie was not found.
    }

    /**
     * @private
     * @function saveMovies
     * @description Saves the current movies array to the CSV file.
     * @returns {void}
     */
    private saveMovies() {
        const csvWriter = createObjectCsvWriter({
            path: CSV_FILE_PATH,
            header: [
                { id: 'name', title: 'Movie Name' },
                { id: 'genre', title: 'Genre' },
                { id: 'year', title: 'Year of Release' },
                { id: 'imageUrl', title: 'Link to Movie Image' },
            ],
        });

        csvWriter.writeRecords(this.movies.map(movie => ({
            name: movie.name,
            genre: movie.genre,
            year: movie.year.toString(), // Converts year to string for CSV output.
            imageUrl: movie.imageUrl,
        }))).then(() => console.log('Movies saved to CSV.')); // Logs a message upon successful save.
    }
}
