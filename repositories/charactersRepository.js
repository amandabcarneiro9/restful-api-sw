const films = require("../data/films.json");
const people = require("../data/people.json");

module.exports = {
  async getCharactersFromMovie(searchTerm) {
    const filmsUrl = films
      .filter((film) => {
        return film.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map((film) => {
        return film.url;
      });

    const peopleFound = people.filter((person) => {
      return person.films.some((filmUrl) => {
        return filmsUrl.includes(filmUrl);
      });
    });

    const results = peopleFound;

    return results;
  },
};
