const connection = require("../configuration/mysql");

module.exports = {
  getCountBooks: function (search) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `SELECT COUNT(*) FROM Books INNER JOIN category ON books.id_category = category.id INNER JOIN author ON books.id_author = author.id INNER JOIN user ON books.id_user = user.id WHERE books.title LIKE "${search}" OR author.name LIKE "${search}"`,
        function (err, result) {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getBooks: function (search, value, sort, start, limit) {
    return new Promise(function (resolve, reject) {
      connection.query(
        `SELECT books.id, books.title, books.description, books.id_category, category.name as category, books.id_author, author.name as author, books.image, books.id_user, user.name as user, books.price, books.created_at, books.updated_at FROM Books INNER JOIN category ON books.id_category = category.id INNER JOIN author ON books.id_author = author.id INNER JOIN user ON books.id_user = user.id WHERE books.title LIKE "${search}" OR author.name LIKE "${search}" ORDER BY ${value} ${sort} LIMIT ${start}, ${limit}`,
        function (err, result) {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  postBook: function (setData) {
    return new Promise(function (resolve, reject) {
      connection.query("INSERT INTO books SET ?", setData, function (
        err,
        result
      ) {
        if (!err) {
          const newData = {
            id: result.insertId,
            ...setData,
          };
          resolve(newData);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  putBook: function (setData, id) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "UPDATE books SET ? WHERE id=?",
        [setData, id],
        function (err, result) {
          if (!err) {
            const newData = {
              id,
              ...setData,
            };
            resolve(newData);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteBook: function (id) {
    return new Promise(function (resolve, reject) {
      connection.query("DELETE FROM books WHERE id=?", id, function (
        err,
        result
      ) {
        if (!err) {
          const newData = {
            id,
          };
          resolve(newData);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
