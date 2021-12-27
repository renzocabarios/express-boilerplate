import { Router } from "express";
import {
  getAllSample,
  getSampleById,
  addSample,
  updateSample,
  deleteSample,
} from "./controllers/sample.controller.js";

const router = Router();
router.route("/").get(getAllSample).post(addSample);
router
  .route("/:id")
  .get(getSampleById)
  .patch(updateSample)
  .delete(deleteSample);

export default router;
