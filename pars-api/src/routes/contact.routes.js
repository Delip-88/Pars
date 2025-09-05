import { Router } from "express";
import { createContact, deleteContact, getContacts, getUsers, updateContactStatus } from "../controller/contact.controller.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

router.post("/",createContact);
router.get("/", authMiddleware,getContacts);
router.delete("/delete/:id", authMiddleware,deleteContact);
router.patch("/update/:id", authMiddleware,updateContactStatus);
router.get("/users",authMiddleware,getUsers)

export default router;
