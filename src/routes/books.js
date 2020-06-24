const express = require("express");
const Route = express.Router();

const bookController = require("../controllers/books");

Route.get("/", bookController.getBooks);
Route.post("/", bookController.postBook);
Route.put("/:id", bookController.putBook);
Route.delete("/:id", bookController.deleteBook);

module.exports = Route;
