const PG = require("../models/PG");


// =======================
// CREATE - Add PG
// =======================
exports.createPG = async (req, res) => {
  try {
    const pg = await PG.create(req.body);
    res.status(201).json(pg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// =======================
// READ - Get all PGs (Search + Filter)
// =======================
exports.getAllPGs = async (req, res) => {
  try {
    const { city, rent, foodFacility } = req.query;

    let query = {};

    // 🔥 Case-insensitive city search
    if (city) {
      query.city = {
        $regex: `^${city.trim()}`,
        $options: "i",
      };
    }

    // 🔥 Rent filter (less than or equal)
    if (rent) {
      query.rent = { $lte: Number(rent) };
    }

    // 🔥 Food facility filter
    if (foodFacility !== undefined && foodFacility !== "") {
      query.foodFacility = foodFacility === "true";
    }

    const pgs = await PG.find(query);
    res.json(pgs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================
// READ - Get Single PG by ID
// =======================
exports.getSinglePG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json(pg);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================
// UPDATE - Update PG
// =======================
exports.updatePG = async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json(pg);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// =======================
// DELETE - Delete PG
// =======================
exports.deletePG = async (req, res) => {
  try {
    const pg = await PG.findByIdAndDelete(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json({ message: "PG deleted successfully" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};