import service from "./service.js";
import bcrypt from "bcrypt";
import ENV from "../../../env/index.js";

const getAll = async (_req, _res) => {
  const data = await service.getAll();
  _res.send({ data, status: "success", message: "Get user success" });
};

const getById = async (_req, _res) => {
  const { id } = _req.params;
  const data = await service.getById(id);
  _res.send({ data: [data], status: "success", message: "Get user success" });
};

const add = async (_req, _res) => {
  const { password, ...res } = _req.body;
  const hashed = await bcrypt.hash(password, ENV.HASH_SALT);
  const data = await service.add({ password: hashed, res });
  _res.send({
    data: [data],
    status: "success",
    message: "Create user success",
  });
};

const update = async (_req, _res) => {
  const { id } = _req.params;
  const { password, ...res } = _req.body;
  const data = await service.update(id, res);
  _res.send({
    data: [data],
    status: "success",
    message: "Update user success",
  });
};

const changePassword = async (_req, _res) => {
  const { id } = _req.params;
  const { password, ...res } = _req.body;
  const hashed = await bcrypt.hash(password, ENV.HASH_SALT);
  const data = await service.update(id, { password: hashed });
  _res.send({
    data: [data],
    status: "success",
    message: "Change password success",
  });
};

const deleteById = async (_req, _res) => {
  const { id } = _req.params;
  const data = await service.deleteById(id);
  _res.send({
    data: [data],
    status: "success",
    message: "Delete user success",
  });
};

export { getAll, getById, add, update, deleteById, changePassword };
