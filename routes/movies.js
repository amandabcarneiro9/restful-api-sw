var express = require("express");
var router = express.Router();
const {
  getCharactersFromMovie,
} = require("../repositories/charactersRepository");

router.get("/characters", async (req, res) => {
  const searchTerm = req.query.searchTerm ? req.query.searchTerm.trim() : "";
  const result = await getCharactersFromMovie(searchTerm);
  res.send(result);
});

module.exports = router;
