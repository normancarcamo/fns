const uuid = require("uuid/v4");
const Logger = require("./logger");
const { HttpError, NotFoundError } = require("./errors");
const log = new Logger("request");
let seq = 0;

function logger(req, res, next) {
  seq++;
  req.error = false;
  req.start = Date.now();
  req.id = uuid();
  req.seq = seq;
  req.log = log;
  res.on("finish", () => {
    !req.error && req.log.info({ req, res });
  });
  next();
}

function notFound (req, res, next) {
  throw new NotFoundError(`${req.url} could not be found`, null);
}

function errors (err, req, res, next) {
  if (err) {
    const isProd = req.app.get("env") === "production";
    req.error = true;

    res.status(err.status || 500).json({
      success: false,
      ...isProd ? {} : { error: { ...err, message: err.message } }
    });

    if (req.log) {
      req.log.error(err.message);
    } else {
      return;
    }
  } else {
    next();
  }
}

function methodNotAllowed(req, res) {
  throw new HttpError("Method not allowed", {
    status: 405
  });
}

module.exports = {
  logger,
  notFound,
  errors,
  methodNotAllowed
};
