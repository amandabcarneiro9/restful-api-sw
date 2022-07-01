var express = require("express");
var router = express.Router();
const {
  getCharactersFromMovie,
} = require("../repositories/charactersRepository");

router.get("/characters", async (req, res) => {
  const result = await getCharactersFromMovie();
  res.send(result);
});

module.exports = router;
