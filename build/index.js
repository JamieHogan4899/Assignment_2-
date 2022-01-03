"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _movies = _interopRequireDefault(require("./api/movies"));

var _genres = _interopRequireDefault(require("./api/genres"));

require("./db");

require("./seedData");

var _users = _interopRequireDefault(require("./api/users"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _authenticate = _interopRequireDefault(require("./authenticate"));

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT;

var errHandler = function errHandler(err, req, res, next) {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send("Something went wrong!");
  }

  res.status(500).send("Hey!! You caught the error \uD83D\uDC4D\uD83D\uDC4D. Here's the details: ".concat(err.stack, " "));
};

app.use(_authenticate["default"].initialize());
app.use(_express["default"].json());
app.use('/api/movies', _authenticate["default"].authenticate('jwt', {
  session: false
}), _movies["default"]);
app.use('/api/genres', _genres["default"]);
app.use('/api/users', _users["default"]);
app.use(errHandler);
var server = app.listen(port, function () {
  console.info("Server running at ".concat(port));
});
module.exports = server;