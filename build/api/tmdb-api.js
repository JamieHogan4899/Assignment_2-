"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpcomingMovies = exports.getTvShows = exports.getTvGenres = exports.getTrendingMovies = exports.getMovies = exports.getGenres = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var getUpcomingMovies = function getUpcomingMovies() {
  return (0, _nodeFetch["default"])("https://api.themoviedb.org/3/movie/upcoming?api_key=".concat(process.env.TMDB_KEY, "&language=en-US&page=1")).then(function (response) {
    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return response.json();
  })["catch"](function (error) {
    throw error;
  });
};

exports.getUpcomingMovies = getUpcomingMovies;

var getMovies = function getMovies() {
  return (0, _nodeFetch["default"])("https://api.themoviedb.org/3/discover/movie?api_key=".concat(process.env.TMDB_KEY, "&language=en-US&page=1")).then(function (response) {
    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return response.json();
  })["catch"](function (error) {
    throw error;
  });
};

exports.getMovies = getMovies;

var getTrendingMovies = function getTrendingMovies() {
  return (0, _nodeFetch["default"])("https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(process.env.TMDB_KEY, "&language=en-US&page=1")).then(function (response) {
    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return response.json();
  })["catch"](function (error) {
    throw error;
  });
};

exports.getTrendingMovies = getTrendingMovies;

var getTvShows = function getTvShows() {
  return (0, _nodeFetch["default"])("https://api.themoviedb.org/3/tv/popular?api_key=".concat(process.env.TMDB_KEY, "&language=en-US&page=1")).then(function (response) {
    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return response.json();
  })["catch"](function (error) {
    throw error;
  });
};

exports.getTvShows = getTvShows;

var getTvGenres = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _nodeFetch["default"])("https://api.themoviedb.org/3/genre/tv/list?api_key=" + process.env.TMDB_KEY + "&language=en-US").then(function (response) {
              if (!response.ok) {
                throw new Error(response.json().message);
              }

              return response.json();
            })["catch"](function (error) {
              throw error;
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTvGenres() {
    return _ref.apply(this, arguments);
  };
}();

exports.getTvGenres = getTvGenres;

var getGenres = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _nodeFetch["default"])("https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.TMDB_KEY + "&language=en-US").then(function (response) {
              if (!response.ok) {
                throw new Error(response.json().message);
              }

              return response.json();
            })["catch"](function (error) {
              throw error;
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getGenres() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getGenres = getGenres;