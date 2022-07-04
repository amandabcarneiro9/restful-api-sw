var express = require("express");
var router = express.Router();
const {
  getCharactersFromMovie,
} = require("../repositories/charactersRepository");

const POSSIBLE_GENDER = ["male", "female", "hermaphrodite", "n/a", "none"];
const POSSIBLE_SORTBY = ["height", "age"];

router.get("/characters", async (req, res) => {
  const searchTerm = req.query.searchTerm ? req.query.searchTerm.trim() : "";
  const gender = req.query.gender ? req.query.gender.trim() : "";
  const sortBy = req.query.sort_by ? req.query.sort_by.trim() : "";
  const orderBy = req.query.order_by ? req.query.order_by.trim() : "asc";

  //validate the gender on request
  const errors = [validateGender(gender), validateSortBy(sortBy)].filter(
    Boolean
  );
  console.log("########", sortBy, orderBy);

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

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

const validateSortBy = (sortBy) =>
  sortBy &&
  !POSSIBLE_SORTBY.includes(sortBy) &&
  ` Sort by ${sortBy} is not valid.`;

module.exports = router;
