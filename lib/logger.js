const uuid = require("uuid/v4");
const os = require("os");
const Pino = require("pino");

const _instance = uuid();

function Logger(ctx = "no context", options) {
  return Pino({
    base: {
      instance: _instance,
      context: ctx,
      pid: process.pid,
      hostname: os.hostname(),
      hostport: parseInt(process.env.SERVER_PORT),
      hostip: process.env.SERVER_HOST,
      env: process.env.NODE_ENV
    },
    enabled: JSON.parse(process.env.LOG_ENABLED),
    name: process.env.APP_NAME,
    level: process.env.LOG_LEVEL,
    prettyPrint: JSON.parse(process.env.LOG_PRETTY_PRINT),
    serializers: {
      req: function(req) {
        return {
          method: req.method,
          url: req.url,
          id: req.id,
          seq: req.seq,
          params: req.params,
          query: req.query,
          headers: req.headers,
          remoteAddress: req.connection.remoteAddress,
          remotePort: req.connection.remotePort
        }
      },
      res: function(res) {
        return {
          elapsed: `${Date.now() - res.req.start}ms`,
          status: res.statusCode,
          headers: res.getHeaders()
        }
      },
      err: Pino.stdSerializers.err
    },
    ...options
  });
};

module.exports = Logger;
