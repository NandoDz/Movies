const knex = require("../db/connection");

function listTheaterByMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ movie_id });
}

function listAllTheaters() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .orderBy("t.theater_id")
    .then((data) => {
      const resultsArray = [];
      data.map((mt) => {
        const movie = {
          movie_id: mt.movie_id,
          title: mt.title,
          runtime_in_minutes: mt.runtime_in_minutes,
          rating: mt.rating,
          description: mt.description,
          image_url: mt.image_url,
          is_showing: mt.is_showing,
          theater_id: mt.theater_id,
        };
        if (!resultsArray.some((r) => r.name === mt.name)) {
          const theaterObj = {
            theater_id: mt.theater_id,
            name: mt.name,
            address_line_1: mt.address_line_1,
            address_line_2: mt.address_line_2,
            city: mt.city,
            state: mt.state,
            zip: mt.zip,
            movies: [movie],
          };
          resultsArray.push(theaterObj);
        } else {
          resultsArray.map((theater) => {
            if (
              theater.name === mt.name &&
              !theater.movies.some((m) => m.title === movie.title)
            )
              theater.movies.push(movie);
          });
        }
      });
      return resultsArray;
    });
}
module.exports = { listTheaterByMovie, listAllTheaters };
