const planets = require("../data/planets.json");

module.exports = {
  async getPlanetsFromMovie(climateSearchTerm) {
    const planetsUrl = planets
      .filter((planet) => {
        return planet.climate
          .toLowerCase()
          .includes(climateSearchTerm.toLowerCase());

        // console.log(planet);
      })
      .map((planet) => {
        return planet.name;
      });

    // const planetIsIncluded = (planetUrl) => planetsUrl.includes(planetUrl);
    // console.log(planetUrl);
    // const climateFound = planets.filter((climate) => {
    //   return climate.planet.some(planetIsIncluded);
    // });

    // const result = climateFound;
    return planetsUrl;
  },
};
