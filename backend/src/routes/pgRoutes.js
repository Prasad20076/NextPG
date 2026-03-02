const express = require("express");
const router = express.Router();
const {
  createPG,
  getAllPGs,
  getSinglePG,
  updatePG,
  deletePG,
} = require("../controllers/pgController");

router.post("/", createPG);        // Add PG
router.get("/", getAllPGs);         // View / Search / Filter
router.get("/:id", getSinglePG);   
router.put("/:id", updatePG);       // Update PG
router.delete("/:id", deletePG);    // Delete PG

module.exports = router;
