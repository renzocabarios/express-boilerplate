import mongoose from "mongoose";
import { MODEL } from "../../../constants/index.js";

const schema = mongoose.Schema({});

export default mongoose.model(MODEL.SAMPLE, schema);
