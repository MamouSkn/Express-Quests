require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json()); // add this line

// const port = 5000;
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

// Création de la route POST, pour renvoyer 'route is working' : 
app.post("/api/movies", movieHandlers.postMovie);

// création de la route pour la mise à jour de la base de données : 
app.put("/api/movies/:id", movieHandlers.updateMovie);



const userHandlers = require("./userHandlers")

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

// Création de la route POST, pour renvoyer 'route is working' : 
app.post("/api/users", userHandlers.postUser);

// création de la route pour la mise à jour de la base de données : 
app.put("/api/users/:id", userHandlers.updateUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
