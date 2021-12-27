import mongoose from "mongoose";
import CONST from "../../constants/index.js";

const schema = mongoose.Schema({});

export default mongoose.model(CONST.MODEL.SAMPLE, schema);
