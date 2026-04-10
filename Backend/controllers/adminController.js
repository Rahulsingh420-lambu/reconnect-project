import Person from "../models/person.js";

export const verifyPerson = async (req, res) => {
  const person = await Person.findById(req.params.id);
  person.status = "verified";
  await person.save();

  res.json(person);
};

export const deletePerson = async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted successfully" });
};