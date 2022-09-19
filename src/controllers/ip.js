const axios = require("axios").default;
const BASE_URL = process.env.BASE_URL;
const { flattenObj } = require("../utils");

module.exports = {
  async getipDetails(req, res, next) {
    try {
      const { ip, apikey } = req.body;
      const ipClause = `?${ip ? "ip=" + ip + "&" : ""}`;
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/${ipClause}apikey=${apikey}`);

      return res.status(200).json({
        message: "success!",
        data: { ...data, location: flattenObj(data.location) },
      });
    } catch (error) {
      next(error);
    }
  },
};
