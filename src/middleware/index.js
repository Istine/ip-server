const axios = require("axios");

module.exports = {
  validate(req, res, next) {
    try {
      const { ip = null, apikey = null } = req.body;
      if (!apikey) {
        throw new Error("apikey missing from request.");
      }
      //check for matching values
      if (ip) {
        const isvalidIp = isMatchFor("ipaddress", ip);
        if (!isvalidIp) {
          throw new Error("enter a valid ip address");
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  },
};

function isMatchFor(name, value) {
  const regex = {
    ipaddress: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
  };
  return regex[name].test(value);
}
