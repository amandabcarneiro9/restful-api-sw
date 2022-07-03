var express = require("express");
var router = express.Router();
const {
  getCharactersFromMovie,
} = require("../repositories/charactersRepository");

const POSSIBLE_GENDER = ["male", "female", "hermaphrodite", "n/a", "none"];

router.get("/characters", async (req, res) => {
  const searchTerm = req.query.searchTerm ? req.query.searchTerm.trim() : "";
  const gender = req.query.gender ? req.query.gender.trim() : "";

  //validate the gender on request
  const errors = [
    gender &&
      !POSSIBLE_GENDER.includes(gender) &&
      `The gender ${gender} is not valid.`,
  ].filter(Boolean);

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  const result = await getCharactersFromMovie(searchTerm, gender);
  res.send(result);
});

//endpoint for planets
// router.get("/planets", async, (req, res));

module.exports = router;
