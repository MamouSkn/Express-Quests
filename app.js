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

const movieHandlers = require("./movieHandlers"); //import de la variable movieHandlers grâce à la route pour y accéder

// // Création des routes GET, pour lire de la donnée dans la BDD tous les films ou par leur id : 
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

// Création de la route POST, pour créer de la donnée dans la BDD :  
app.post("/api/movies", movieHandlers.postMovie);

// création de la route UPDATE pour mettre à jour les données de la BDD :  
app.put("/api/movies/:id", movieHandlers.updateMovie);

// Création de la route DELETE, pour supprimer des données de la BDD :
app.delete("/api/movies/:id", movieHandlers.deleteMovie);



const userHandlers = require("./userHandlers")

// // Création des routes GET, pour lire de la donnée dans la BDD, tous les users ou par leur id : 
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

// Création de la route POST, pour créer de la donnée dans la BDD : 
app.post("/api/users", userHandlers.postUser);

// création de la route UPDATE pour mettre à jour les données de la BDD : 
app.put("/api/users/:id", userHandlers.updateUser);

// Création de la route DELETE, pour supprimer des données de la BDD :
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
