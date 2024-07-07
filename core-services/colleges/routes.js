const express = require("express");
const router = express.Router();
const { College, Company } = require("../../database/models");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const colleges = await College.findAll();
    res.json(colleges);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching colleges", error: error.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const college = await College.findByPk(req.params.id, {
      include: [Company],
    });
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.json(college);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching college", error: error.message });
  }
});

module.exports = router;

