import { Router } from "express";
import {
  getAll,
  getById,
  add,
  update,
  deleteById,
  changePassword,
} from "./users.controller.js";

const router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(deleteById);
router.route("/:id/password").patch(changePassword);

export default router;
