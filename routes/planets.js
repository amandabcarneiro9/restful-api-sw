var express = require("express");
var router = express.Router();
const { getPlanetsFromMovie } = require("../repositories/planetsRepository");

router.get("/planets", async (req, res) => {
  const climateSearchTerm = req.query.climateSearchTerm
    ? req.query.climateSearchTerm.trim()
    : "";

  const result = await getPlanetsFromMovie();
  res.send(result);
});

module.exports = router;
