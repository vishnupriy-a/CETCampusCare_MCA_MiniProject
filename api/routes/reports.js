import express from "express";
import { addReport, getReports, deleteReport} from "../controllers/report.js";

const router = express.Router()

router.get("/", getReports)
router.post("/", addReport)
router.delete("/", deleteReport)


export default router
