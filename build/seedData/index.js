"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMovies = loadMovies;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userModel = _interopRequireDefault(require("../api/users/userModel"));

var _users = _interopRequireDefault(require("./users"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _genres = _interopRequireDefault(require("./genres"));

var _genreModel = _interopRequireDefault(require("../api/genres/genreModel"));

var _movieModel = _interopRequireDefault(require("../api/movies/movieModel"));

var _movies = _interopRequireDefault(require("./movies.js"));

_dotenv["default"].config(); // deletes all user documents in collection and inserts test data


function loadUsers() {
  return _loadUsers.apply(this, arguments);
} // deletes all genres in collection and inserts test data


function _loadUsers() {
  _loadUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('load user Data');
            _context.prev = 1;
            _context.next = 4;
            return _userModel["default"].deleteMany();

          case 4:
            _context.next = 6;
            return _users["default"].forEach(function (user) {
              return _userModel["default"].create(user);
            });

          case 6:
            console.info("".concat(_users["default"].length, " users were successfully stored."));
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.error("failed to Load user Data: ".concat(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _loadUsers.apply(this, arguments);
}

function loadGenres() {
  return _loadGenres.apply(this, arguments);
} // deletes all movies documents in collection and inserts test data


function _loadGenres() {
  _loadGenres = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('load genre Data');
            _context2.prev = 1;
            _context2.next = 4;
            return _genreModel["default"].deleteMany();

          case 4:
            _context2.next = 6;
            return _genreModel["default"].collection.insertMany(_genres["default"]);

          case 6:
            console.info("".concat(_genres["default"].length, " users were successfully stored."));
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.error("failed to Load user Data: ".concat(_context2.t0));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _loadGenres.apply(this, arguments);
}

function loadMovies() {
  return _loadMovies.apply(this, arguments);
}

function _loadMovies() {
  _loadMovies = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('load seed data');
            console.log(_movies["default"].length);
            _context3.prev = 2;
            _context3.next = 5;
            return _movieModel["default"].deleteMany();

          case 5:
            _context3.next = 7;
            return _movieModel["default"].collection.insertMany(_movies["default"]);

          case 7:
            console.info("".concat(_movies["default"].length, " Movies were successfully stored."));
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            console.error("failed to Load movie Data: ".concat(_context3.t0));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 10]]);
  }));
  return _loadMovies.apply(this, arguments);
}

if (process.env.SEED_DB == 'true') {
  loadUsers();
  loadGenres(); //you may not need this line if you skipped the exercises

  loadMovies(); //ADD THIS LINE
}