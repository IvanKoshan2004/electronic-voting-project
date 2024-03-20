const dotenv = require("dotenv");
const { z } = require("zod");

dotenv.config();

module.exports = {
  ...z
    .object({
      APP_PORT: z.string().refine(val => /^[0-9]+$/.test(val)),
      DATABASE_URL: z.string(),
      PRIVATE_KEY: z.string(),
      ELECTION_FACTORY_CONTRACT_ADDRESS: z.string(),
    })
    .parse(process.env),
};
