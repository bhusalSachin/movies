import express from 'express'; // Importing the express framework
import bodyParser from 'body-parser'; // Importing body-parser middleware for parsing request bodies
import movieRoutes from './routes'; // Importing the movie routes from the routes module
import cors from 'cors'; // Importing cors middleware for handling Cross-Origin Resource Sharing

import { setupSwagger } from './swagger';

const app = express(); // Creating an Express application
const PORT = process.env.PORT || 3000; // Setting the port, using environment variable or defaulting to 3000

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Using the movie routes for handling related API requests
app.use(movieRoutes);

setupSwagger(app)

// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Logging the server URL to the console
});
