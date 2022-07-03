const films = require("../data/films.json");
const people = require("../data/people.json");

module.exports = {
  async getCharactersFromMovie(searchTerm, gender) {
    const filmsUrl = films
      .filter((film) => {
        return film.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map((film) => {
        return film.url;
      });

    const filmIsIncluded = (filmUrl) => filmsUrl.includes(filmUrl);

    const genderMatches = (person) => !gender || person.gender === gender;

    const peopleFound = people.filter((person) => {
      return person.films.some(filmIsIncluded) && genderMatches(person);
    });
    const results = peopleFound;

    return results;
  },
};
