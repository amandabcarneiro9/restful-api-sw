var express = require("express");
var router = express.Router();
const {
  getPlanetsByClimateWithDarkHairedPeople,
} = require("../repositories/planetsRepository");

router.get("/dark_haired_characters", async (req, res) => {
  const climateSearchTerm = req.query.climateSearchTerm
    ? req.query.climateSearchTerm.trim()
    : "";

  const result = await getPlanetsByClimateWithDarkHairedPeople(
    climateSearchTerm
  );
  res.send(result);
});

module.exports = router;
