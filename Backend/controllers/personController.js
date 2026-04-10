import Person from "../models/person.js";

// GET ALL
export const getAll = async (req, res) => {
  const data = await Person.find();
  res.json(data);
};

// GET MISSING
export const getMissing = async (req, res) => {
  const data = await Person.find({ status: "missing" });
  res.json(data);
};

// GET FOUND
export const getFound = async (req, res) => {
  const data = await Person.find({ status: "found" });
  res.json(data);
};

// ADD
export const addPerson = async (req, res) => {
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const data = await Person.create({
    ...req.body,
    image,
    status: req.body.status || "missing", // ✅ ADD THIS
  });

  res.json(data);
};

// UPDATE
export const updatePerson = async (req, res) => {
  const data = await Person.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
};

// DELETE
export const deletePerson = async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};