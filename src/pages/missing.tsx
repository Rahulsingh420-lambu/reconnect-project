import { useEffect, useState } from "react";
import API from "../api";

interface Person {
  _id: string;
  name: string;
  age: number;
  location: string;
  description: string;
  image?: string;
}

const Missing = () => {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

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

  // ✅ ADD / UPDATE
  const handleSubmit = async () => {
    if (!form.name || !form.location) {
      alert("Please fill required fields");
      return;
    }

    try {
      // 🔥 FormData (IMPORTANT)
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("age", form.age);
      formData.append("location", form.location);
      formData.append("description", form.description);

      if (editId) {
        await API.put(`/persons/${editId}`, formData);
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

      fetchMissing();
    } catch (err: any) {
      console.error("ERROR:", err.response?.data || err.message);
    alert(err?.response?.data?.msg || err.message)
console.error(err);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/admin/${id}`);
      alert("Deleted ✅");
      fetchMissing();
    } catch (err: any) {
      console.error("DELETE ERROR:", err.response?.data || err.message);
      alert("Delete failed ❌");
    }
  };

  // ✏ EDIT
  const handleEdit = (person: Person) => {
    setForm({
      name: person.name,
      age: person.age.toString(),
      location: person.location,
      description: person.description,
      image: person.image || "",
    });

    setEditId(person._id);
  };

  // 📦 FETCH
  const fetchMissing = async () => {
    try {
      const res = await API.get("/persons");
      setData(res.data.persons || res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissing();
  }, []);

  // 🔍 FILTER
  const filtered = data.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  return (
    <div className="main">
      <h2 className="title">
        {editId ? "Edit Missing Person" : "Add Missing Person"}
      </h2>

      {/* FORM */}
      <div className="form glass">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

        <button className="btn-primary" onClick={handleSubmit}>
          {editId ? "Update" : "Submit"}
        </button>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input placeholder="🔍 Search by name..." onChange={(e) => setSearch(e.target.value)} />
        <input placeholder="📍 Filter by location..." onChange={(e) => setFilterLocation(e.target.value)} />
      </div>

      {/* LIST */}
      <h2 className="section-title">Missing Persons</h2>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No missing persons found</p>
      ) : (
        <div className="grid">
          {filtered.map((person) => (
            <div key={person._id} className="card glass">
              <img
                src={person.image || "https://via.placeholder.com/150"}
                alt={person.name}
              />

              <h3>{person.name}</h3>
              <p>Age: {person.age}</p>
              <p>📍 {person.location}</p>
              <p>{person.description}</p>

              <div className="btn-group">
                <button className="btn-edit" onClick={() => handleEdit(person)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(person._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Missing;