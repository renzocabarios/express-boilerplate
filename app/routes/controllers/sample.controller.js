import sampleService from "../services/sample.service.js";

const getAllSample = async (req, res) => {
  const samples = sampleService.getAll();
  res.send({ samples });
};

const getSampleById = async (req, res) => {
  const { id } = req.params;
  const sample = sampleService.getById(id);
  res.send({ sample });
};

const addSample = async (req, res) => {
  const sample = sampleService.add(req.body);
  res.send({ sample });
};

const updateSample = async (req, res) => {
  const { id } = req.params;
  const sample = sampleService.update(id, req.body);
  res.send({ sample });
};

const deleteSample = async (req, res) => {
  const { id } = req.params;
  const sample = sampleService.deleteById(id);
  res.send({ sample });
};

export { getAllSample, getSampleById, addSample, updateSample, deleteSample };
