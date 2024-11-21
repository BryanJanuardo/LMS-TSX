var express = require("express");
var router = express.Router({ mergeParams: true });

const Material = require("../models/material");

// get all
router.get("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch All Materials`, message: ``, error: ``, data: null };
  try {
    const materials = await Material.find();
    status = 200;
    payload.message = `Successfully fetched all materials`;
    payload.data = materials;
  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch materials`;
    payload.error = `Error fetching materials`;
  }

  return res.status(status).json(payload);
});

// get by id
router.get("/:MaterialID", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch Material By MaterialID`, message: ``, error: ``, data: null };
  const materialId = req.params.MaterialID;

  try {
    const material = await Material.findById(materialId);

    if (!material) {
      status = 404;
      payload.message = `Failed to fetch material`;
      payload.error = `Material ${materialId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully fetched material`;
      payload.data = material;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch material`;
    payload.error = `Error fetching material with MaterialID: ${materialId}`;
  }

  return res.status(status).json(payload);
});

// create
router.post("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Create New Material`, message: ``, error: ``, data: null };

  try {
    const lastMaterial = await Material.findOne({}, {}, { sort: { _id: -1 } });
    const newMaterialId = lastMaterial ? lastMaterial._id + 1 : 1;
    await Material.create({
      _id: newMaterialId,
      MaterialName: req.body.MaterialName,
      MaterialType: req.body.MaterialType,
      MaterialPath: req.body.MaterialPath,
    });

    status = 201;
    payload.message = `Successfully created new material`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = `Failed to create material`;
    payload.error = `Error creating material`;
  }

  return res.status(status).json(payload);
});

// update
router.put("/:MaterialID", async (req, res) => {
  let status = 500;
  const payload = { header: `Update Material`, message: ``, error: ``, data: null };
  const materialId = req.params.MaterialID;

  try {
    const currMaterial = await Material.findByIdAndUpdate(materialId, req.body, { new: true });

    if (!currMaterial) {
      status = 404;
      payload.message = `Failed to update material`;
      payload.error = `Material ${materialId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully updated material`;
      payload.data = currMaterial;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to update material`;
    payload.error = `Error updating material with MaterialID: ${materialId}`;
  }

  return res.status(status).json(payload);
});

// delete
router.delete("/:MaterialID", async (req, res) => {
  let status = 500;
  const payload = { header: `Delete Material`, message: ``, error: ``, data: null };
  const materialId = req.params.MaterialID;

  try {
    const currMaterial = await Material.findByIdAndDelete(materialId);

    if (!currMaterial) {
      status = 404;
      payload.message = `Failed to delete material`;
      payload.error = `Material ${materialId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully deleted material`;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to delete material`;
    payload.error = `Error deleting material with MaterialID: ${materialId}`;
  }

  return res.status(status).json(payload);
});

module.exports = router;