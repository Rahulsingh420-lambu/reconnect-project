import { useState } from "react";
import API from "../api";

const AddCase = () => {
  const [form, setForm] = useState<any>({
    name: "",
    age: "",
    location: "",
    description: "",
    image: null, // ✅ IMPORTANT
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FINAL SUBMIT FUNCTION
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("status", "missing");
    formData.append("image", form.image); // ✅ image send

    try {
      await API.post("/person", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Case Added ✅");

      // reset form
      setForm({
        name: "",
        age: "",
        location: "",
        description: "",
        image: null,
      });

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="main">
      <h2>Add New Case</h2>

      <div className="form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
        />

        {/* ✅ FILE INPUT FIX */}
        <input
          type="file"
          onChange={(e: any) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddCase;