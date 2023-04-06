import service from "../users/service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../../../env/index.js";

const authenticate = async (_req, _res) => {
  const { email, password } = _req.body;
  const data = await service.getByEmail(email);

  if (!data) {
    _res.send({ data: [], status: "fail", message: "User not found" });
    return;
  }

  if (!(await bcrypt.compare(password, data.password))) {
    _res.send({ data: [], status: "fail", message: "Password not match" });
    return;
  }
  _res.send({
    data: [data],
    status: "success",
    message: "Authenticate user success",
    meta: {
      token: jwt.sign({ id: data._id }, ENV.JWT_KEY, { expiresIn: "1y" }),
    },
  });
};

export { authenticate };
