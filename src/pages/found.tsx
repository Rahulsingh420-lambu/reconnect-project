import { useEffect, useState } from "react";
import API from "../api";

interface FoundPerson {
  _id: string;
  name: string;
  age: number;
  location: string;
  description: string;
  image?: string;
}

const Found = () => {
  const [data, setData] = useState<FoundPerson[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    description: "",
    image: "",
  });

  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📦 FETCH
  const fetchFound = async () => {
    try {
      const res = await API.get("/persons/found"); // ✅ FIXED
      setData(res.data);
    } catch (error) {
      console.error("Error fetching found:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFound();
  }, []);

  // ✅ ADD + UPDATE
  const handleSubmit = async () => {
    try {
      if (editId) {
        await API.put(`/persons/${editId}`, form); // ✅ FIXED
        alert("Updated ✅");
        setEditId(null);
      } else {
        await API.post("/persons", {
  ...form,
  status: "missing", // ✅
});
      }

      setForm({
        name: "",
        age: "",
        location: "",
        description: "",
        image: "",
      });

      fetchFound();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.msg || "Error ❌"); // better error
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/persons/${id}`); // ✅ FIXED
      alert("Deleted ✅");
      fetchFound();
    } catch (error) {
      console.error(error);
    }
  };

  // ✏ EDIT
  const handleEdit = (person: FoundPerson) => {
    setForm({
      name: person.name,
      age: person.age.toString(),
      location: person.location,
      description: person.description,
      image: person.image || "",
    });

    setEditId(person._id);
  };

  return (
    <div className="main">
      <h2>{editId ? "Edit Found Person" : "Report Found Person"}</h2>

      <div className="form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Submit"}
        </button>
      </div>

      <h2 style={{ marginTop: "30px" }}>Found Persons</h2>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No found persons available</p>
      ) : (
        <div className="grid">
          {data.map((person) => (
            <div key={person._id} className="card">
              <img
                src={person.image || "https://via.placeholder.com/150"}
                alt={person.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />

              <h3>{person.name}</h3>
              <p>Age: {person.age}</p>
              <p>📍 {person.location}</p>
              <p>{person.description}</p>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleEdit(person)}>✏ Edit</button>
                <button onClick={() => handleDelete(person._id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Found;