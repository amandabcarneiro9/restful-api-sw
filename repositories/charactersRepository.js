const films = require("../data/films.json");

module.exports = {
  async getCharactersFromMovie(searchTerm) {
    const filmsUrl = films
      .filter((film) => {
        return film.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map((film) => {
        console.log(film);
        return film;
      });
    return filmsUrl;
  },
};
