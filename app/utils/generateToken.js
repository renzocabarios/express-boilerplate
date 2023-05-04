import jwt from "jsonwebtoken";
import ENV from "../env/index.js";

export default (payload, expiresIn) => {
  return jwt.sign(payload, ENV.JWT_KEY, { expiresIn });
};
