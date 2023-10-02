const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];


// Création de la fonction de requêtage pour fetch un film sur l'API avec le mot clé 'get' : 
// const getMovies = (req, res) => {
//   res.json(movies);
// };
const getMovies = (req, res) => {
  database
  .query("select * from movies")
  .then(([movies]) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};


// Création de la fonction de requêtage pour fetch un film par son Id avec le mot clé 'get' :
const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  // const movie = movies.find((movie) => movie.id === id);
  database
    .query("select * from movies where id = ?", [id])
    .then(([movie]) => {
      if (movie != null) {
        res.json(movie[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
};


// Création de la fonction de requêtage de création de film avec le mot clé 'post' :
// const postMovie = (req, res) => {
  // console.log(req.body);
  // res.send("Post route is working 🎉");
// };
  const postMovie = (req, res) => {
    const { title, director, year, color, duration } = req.body;

    database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      // wait for it
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
  };



// Mise a jour (update) de la base de données : 
const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};
  

// Creation de la route pour supprimer (DELETE) les données de la BDD : 
const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from movies where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};



// Export des fonction crées juste au dessus pour pouvoir les utiliser dans l'app (App.js) : 
module.exports = {
  getMovies,
  getMovieById,
  postMovie, // don't forget to export your function ;)
  updateMovie,
  deleteMovie,
};
