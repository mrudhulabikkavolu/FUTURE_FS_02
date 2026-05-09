const express = require("express");
const router = express.Router();

const Lead = require("../models/Lead");

router.post("/add", async (req, res) => {
  try {
    const newLead = new Lead(req.body);

    await newLead.save();

    res.status(201).json({
      message: "Lead Added Successfully",
      lead: newLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding lead",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leads",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Lead Updated Successfully",
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating lead",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting lead",
      error: error.message,
    });
  }
});

module.exports = router;