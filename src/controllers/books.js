const bookModel = require("../models/books");
const helper = require("../helpers");

module.exports = {
  getBooks: async function (req, res) {
    try {
      if (req.query.page === undefined || req.query.page === "") {
        req.query.page = 1;
      }

      if (req.query.limit === undefined || req.query.limit === "") {
        req.query.limit = 6;
      }
      if (req.query.sort === "false") {
        req.query.sort = "DESC";
      } else {
        req.query.sort = "ASC";
      }
      if (req.query.value === undefined || req.query.value === "") {
        req.query.value = "books.title";
      } else if (req.query.value === "title") {
        req.query.value = "books.title";
      } else if (req.query.value === "author") {
        req.query.value = "author.name";
      }
      if (req.query.search === undefined || req.query.search === "") {
        req.query.search = "";
      }
      const value = req.query.value;
      const sort = req.query.sort;
      const limit = parseInt(req.query.limit);
      const start = (req.query.page - 1) * limit;
      const currentPage = parseInt(req.query.page);
      const next = parseInt(currentPage + 1);
      const previous = parseInt(currentPage - 1);
      const search = `%${req.query.search}%`;
      const data = await bookModel.getCountBooks(search);
      const result = await bookModel.getBooks(
        search,
        value,
        sort,
        start,
        limit
      );
      const totalData = data[0]["COUNT(*)"];
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        totalPage,
        totalData,
        currentPage,
        limit,
        next,
        previous,
      };

      return helper.response(res, 200, result, pagination);
    } catch (error) {
      return helper.response(res, 500, error);
    }
  },
  postBook: async function (req, res) {
    try {
      const setData = req.body;
      if (req.file) {
        setData.image = req.file.filename;
      }

      const result = await bookModel.postBook(setData);

      return helper.response(res, 200, result);
    } catch (error) {
      return helper.response(res, 500, error);
    }
  },
  putBook: async function (req, res) {
    try {
      const setData = req.body;
      if (req.file) {
        setData.image = req.file.filename;
      }
      const id = req.params.id;

      const result = await bookModel.putBook(setData, id);

      return helper.response(res, 200, result);
    } catch (error) {
      return helper.response(res, 500, error);
    }
  },
  deleteBook: async function (req, res) {
    try {
      const id = req.params.id;

      const result = await bookModel.deleteBook(id);

      return helper.response(res, 200, result);
    } catch (error) {
      return helper.response(res, 500, error);
    }
  },
};
