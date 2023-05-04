import service from "./service.js";
import bcrypt from "bcrypt";
import ENV from "../../../env/index.js";
import { transaction } from "../../../utils/index.js";
import mongoose from "mongoose";
import auth from "../auth/service.js";

const getAll = async (_req, _res) => {
  const data = await service.getAll();
  _res.send({ data, status: "success", message: "Get user success" });
};

const add = async (_req, _res) => {
  const session = await mongoose.startSession();
  const { email, password, ...res } = _req.body;
  const hashed = await bcrypt.hash(password, ENV.HASH_SALT);
  _res.send(
    await transaction(
      session,
      async () => {
        await auth.add({ email, password: hashed }, session);
        return await service.add({ ...res }, session);
      },
      "Create user"
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
      "Update user"
    )
  );
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
      "Delete user"
    )
  );
};

export { getAll, add, update, removeOne };
