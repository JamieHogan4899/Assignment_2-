"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _moviesData = require("./moviesData");

var _uniqid = _interopRequireDefault(require("uniqid"));

var _movieModel = _interopRequireDefault(require("./movieModel"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _tmdbApi = require("../tmdb-api");

var router = _express["default"].Router();

router.get('/', (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, _ref2, totalDocumentsPromise, moviesPromise, totalDocuments, movies, returnObject;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit; // destructure page and limit and set default values

            _ref2 = [+page, +limit];
            page = _ref2[0];
            limit = _ref2[1];
            //trick to convert to numeric (req.query will contain string values)
            totalDocumentsPromise = _movieModel["default"].estimatedDocumentCount(); //Kick off async calls

            moviesPromise = _movieModel["default"].find().limit(limit).skip((page - 1) * limit);
            _context.next = 8;
            return totalDocumentsPromise;

          case 8:
            totalDocuments = _context.sent;
            _context.next = 11;
            return moviesPromise;

          case 11:
            movies = _context.sent;
            returnObject = {
              page: page,
              total_pages: Math.ceil(totalDocuments / limit),
              total_results: totalDocuments,
              results: movies
            }; //construct return Object and insert into response object

            res.status(200).json(returnObject);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())); // Get movie details

router.get('/:id/reviews', function (req, res) {
  var id = parseInt(req.params.id); // find reviews in list

  if (_moviesData.movieReviews.id == id) {
    res.status(200).json(_moviesData.movieReviews);
  } else {
    res.status(404).json({
      message: 'The resource you requested could not be found.',
      status_code: 404
    });
  }
});
router.post('/:id/reviews', function (req, res) {
  var id = parseInt(req.params.id);

  if (_moviesData.movieReviews.id == id) {
    req.body.created_at = new Date();
    req.body.updated_at = new Date();
    req.body.id = (0, _uniqid["default"])();

    _moviesData.movieReviews.results.push(req.body); //push the new review onto the list


    res.status(201).json(req.body);
  } else {
    res.status(404).json({
      message: 'The resource you requested could not be found.',
      status_code: 404
    });
  }
});
router.get('/tmdb/upcoming', (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var upcomingMovies;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _tmdbApi.getUpcomingMovies)();

          case 2:
            upcomingMovies = _context2.sent;
            res.status(200).json(upcomingMovies);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}()));
router.get('/tmdb/discover', (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var discoverMovies;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _tmdbApi.getMovies)();

          case 2:
            discoverMovies = _context3.sent;
            res.status(200).json(discoverMovies);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}()));
router.get('/tmdb/trending', (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var trendingMovies;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _tmdbApi.getTrendingMovies)();

          case 2:
            trendingMovies = _context4.sent;
            res.status(200).json(trendingMovies);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}()));
router.get('/tmdb/tvShows', (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var tvShows;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _tmdbApi.getTvShows)();

          case 2:
            tvShows = _context5.sent;
            res.status(200).json(tvShows);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}()));
router.get('/tmdb/tvGenres', (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var tvGenres;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _tmdbApi.getTvGenres)();

          case 2:
            tvGenres = _context6.sent;
            res.status(200).json(tvGenres);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}()));
router.get('/tmdb/movieGenres', (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var movieGenres;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _tmdbApi.getGenres)();

          case 2:
            movieGenres = _context7.sent;
            res.status(200).json(movieGenres);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}()));
var _default = router;
exports["default"] = _default;