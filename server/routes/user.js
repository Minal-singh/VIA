import express from "express";

import { getUsers, signin, signup, verifyUser } from "../controllers/user.js";

const router = express.Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/confirm/:confirmationCode", verifyUser);
router.get("/get-users", getUsers);

export default router;
