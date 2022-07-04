const films = require("../data/films.json");
const people = require("../data/people.json");
const PAGE_SIZE = 30;

module.exports = {
  async getCharactersFromMovie(searchTerm, gender, sortBy, orderBy, page) {
    const filmsUrl = films
      .filter((film) => {
        return film.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map((film) => film.url);

    const filmIsIncluded = (filmUrl) => filmsUrl.includes(filmUrl);

    const genderMatches = (person) => !gender || person.gender === gender;

    const peopleFound = people.filter((person) => {
      return person.films.some(filmIsIncluded) && genderMatches(person);
    });
    const results = peopleFound;

    if (sortBy) {
      const sortFunction = decideSortFunction(sortBy, orderBy);
      results.sort(sortFunction);
    }

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pagination = peopleFound.slice(start, end);
    const previousPage = page === 1 ? null : page - 1;
    const nextPage = peopleFound.slice(end).length === 0 ? null : page + 1;

    return {
      count: results.length,
      nextPage,
      previousPage,
      pagination,
    };
  },
};

const decideSortFunction = (sortBy, orderBy) => {
  if (sortBy === "height" && orderBy === "asc") return sortByHeightAscending;
  if (sortBy === "height" && orderBy === "desc") return sortByHeightDescending;
  if (sortBy === "age" && orderBy === "asc") return sortByAgeAscending;
  if (sortBy === "age" && orderBy === "desc") return sortByAgeDescending;
};

const sortByHeightAscending = (person1, person2) =>
  parseInt(person1.height) - parseInt(person2.height);

const sortByHeightDescending = (person1, person2) =>
  sortByHeightAscending(person2, person1);

const sortByAgeAscending = (person1, person2) => {
  if (person1.birth_year === "unknown") return -1;
  if (person2.birth_year === "unknown") return 1;
  return (
    parseBirthYear(person1.birth_year) - parseBirthYear(person2.birth_year)
  );
};

const parseBirthYear = (birthYear) => parseFloat(birthYear.replace("BBY", ""));

const sortByAgeDescending = (person1, person2) =>
  sortByAgeAscending(person2, person1);
