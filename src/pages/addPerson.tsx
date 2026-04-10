import { useState } from "react";
import type { Person } from "../types/person";

const AddPerson = ({ onAdd }: any) => {
  const [form, setForm] = useState<Person>({
    name: "",
    age: 0,
    location: "",
    image: "",
    description: "",
    status: "missing",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.location) {
      alert("Please fill required fields");
      return;
    }

    onAdd(form);

    // reset form
    setForm({
      name: "",
      age: 0,
      location: "",
      image: "",
      description: "",
      status: "missing",
    });
  };

  return (
    <div className="form-box">
      <h2>Add Missing Person</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

      <button onClick={handleSubmit}>Add Person</button>
    </div>
  );
};

export default AddPerson;