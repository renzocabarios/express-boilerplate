import sampleModel from "../models/sample.model.js";

const getAll = async () => {
  return await sampleModel.find();
};

const getById = async (id) => {
  return await sampleModel.findById({ _id: id });
};

const add = async (body) => {
  return await sampleModel.create(body);
};

const update = async (id, body) => {
  return await sampleModel.findByIdAndUpdate({ _id: id }, body);
};

const deleteById = async (id) => {
  return await sampleModel.findByIdAndDelete({ _id: id });
};

export default { getAll, getById, add, update, deleteById };
