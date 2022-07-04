var express = require("express");
var router = express.Router();
const {
  getCharactersFromMovie,
} = require("../repositories/charactersRepository");

const POSSIBLE_GENDER = ["male", "female", "hermaphrodite", "n/a", "none"];

router.get("/characters", async (req, res) => {
  const searchTerm = req.query.searchTerm ? req.query.searchTerm.trim() : "";
  const gender = req.query.gender ? req.query.gender.trim() : "";
  // const sortBy = req.query.sortBy ? req.query.sortBy.trim() : "";
  // const orderBy = req.query.orderBy ? req.query.orderBy.trim() : "";

  //validate the gender on request
  const errors = [validateGender(gender)].filter(Boolean);

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  //validate the sortBy and orderBy

  // if(sortBy === "height"){
  //   return
  // }

  const result = await getCharactersFromMovie(
    searchTerm,
    gender,
    sortBy,
    orderBy
  );
  res.send(result);
});

const validateGender = (gender) =>
  gender &&
  !POSSIBLE_GENDER.includes(gender) &&
  `The gender ${gender} is not valid.`;

module.exports = router;
