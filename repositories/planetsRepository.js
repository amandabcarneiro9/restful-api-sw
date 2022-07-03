const planets = require("../data/planets.json");
const people = require("../data/people.json");

module.exports = {
  async getPlanetsByClimateWithDarkHairedPeople(climateSearchTerm) {
    const planetsFound = planets.filter((planet) => {
      return planet.climate
        .toLowerCase()
        .includes(climateSearchTerm.toLowerCase());
    });

    const planetsNames = planetsFound.map((planet) => {
      return planet.name;
    });

    const plantesUrls = planetsFound.map((planet) => {
      return planet.url;
    });

    const darkHairedPeopleOnPlanets = people.filter((person) => {
      return (
        person.hair_color === "black" && plantesUrls.includes(person.homeworld)
      );
    });

    return {
      planetsNames,
      darkHairedPeopleOnPlanets,
    };
  },
};
