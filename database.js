require("dotenv").config();

const mysql = require("mysql2/promise");


// CREATION DU POOL MYSQL AVEC LES VARIABLES DE CONNEXION :

const database = mysql.createPool({
    host: process.env.DB_HOST, // address of the server
    port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });



// ESSAI POUR PREMIERE CONNEXION DEPUIS LE POOL MYSQL2 : 

  // database
  //   .getConnection()
  //   .then(() => {
  //   console.log("Can reach database");
  //   })
  //   .catch((err) => {
  //   console.error(err);
  //   });

  
  // ECRITURE D'UNE REQUETE AVEC LA METHODE QUERY : 

  // database
  // .query("select * from movies")
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });

  database
  .query("select * from movies")
  .then((result) => {
    const movies = result[0];
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });





// DEPLACEMENT DU MORCEAU DE CODE OBTENU PRECEDEMENT DANS LA FONCTION GETMOVIES QUI A ETE DEFINI DANS MOVIEHANDLERS.JS : 

// const database = require("./database");

// const getMovies = (req, res) => {
//   database
//     .query("SELECT * FROM movies")
//     .then(([movies]) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//     console.error(err);
//     res.status(500).send("Une erreur a eu lieu...")
//   });
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

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


//ECRIRE UNE REQUETE AVEC UN PARAMETRE : 

// const getUserById = (req, res) => {
//   const id = parseInt(req.params.id);

//   database
//     .query("select director from movies where id = ?" [id])
//     .then(([movies]) => {
//       if (movies[0] != null) {
//         res.json(movies[0]);
//       } else {
//         res.status(404).send("Not Found");
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// }



module.exports = database;