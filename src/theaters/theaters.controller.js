const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { movie_id } = req.params;

  const data = movie_id ? await service.listTheaterByMovie(movie_id) : await service.listAllTheaters();
  res.json({ data });
}
module.exports = { list: asyncErrorBoundary(list) };
