import service from "./service.js";
import users from "../users/service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../../../env/index.js";
import mongoose from "mongoose";
import { transaction } from "../../../utils/index.js";

const authenticate = async (_req, _res) => {
  // const { email, password } = _req.body;
  // const data = await service.getByEmail(email);

  // if (!data) {
  //   _res.send({ data: [], status: "fail", message: "User not found" });
  //   return;
  // }

  // if (!(await bcrypt.compare(password, data.password))) {
  //   _res.send({ data: [], status: "fail", message: "Password not match" });
  //   return;
  // }
  // _res.send({
  //   data: [data],
  //   status: "success",
  //   message: "Authenticate user success",
  //   meta: {
  //     token: jwt.sign({ id: data._id }, ENV.JWT_KEY, { expiresIn: "1y" }),
  //   },
  // });
  next();
};
const getAll = async (_req, _res) => {
  const data = await service.getAll();
  _res.send({ data, status: "success", message: "Get auth success" });
};

const add = async (_req, _res) => {
  const session = await mongoose.startSession();
  const { password, ...res } = _req.body;
  const hashed = await bcrypt.hash(password, ENV.HASH_SALT);
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.add({ ...res, password: hashed }, session);
      },
      "Create auth"
    )
  );
};

const update = async (_req, _res) => {
  const session = await mongoose.startSession();
  const { id } = _req.params;
  const { password, ...res } = _req.body;
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.update({ _id: id }, res, session);
      },
      "Update auth"
    )
  );
};

const changePassword = async (_req, _res) => {
  const { id } = _req.params;
  const { password } = _req.body;
  const hashed = await bcrypt.hash(password, ENV.HASH_SALT);
  const data = await service.update(id, { password: hashed });
  _res.send({
    data: [data],
    status: "success",
    message: "Change password success",
  });
};

const removeOne = async (_req, _res) => {
  const session = await mongoose.startSession();

  const { id } = _req.params;
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.removeOne({ _id: id }, session);
      },
      "Delete auth"
    )
  );
};

export { getAll, add, update, removeOne, authenticate, changePassword };
