import mongoose from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model(RESOURCE.USERS, schema);
