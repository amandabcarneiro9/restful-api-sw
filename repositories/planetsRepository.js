const planets = require("../data/planets.json");

module.exports = {
  async getPlanetsFromMovie() {
    return planets;
  },
};
