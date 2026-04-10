import type { Person } from "../types/person";

const AdminPanel = ({ people, setPeople }: any) => {
  const verifyPerson = (index: number) => {
    const updated = [...people];
    updated[index].verified = true;
    setPeople(updated);
  };

  const deletePerson = (index: number) => {
    const updated = people.filter((_: any, i: number) => i !== index);
    setPeople(updated);
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {people.map((p: Person, i: number) => (
        <div key={i}>
          <p>{p.name} - {p.location}</p>
          <button onClick={() => verifyPerson(i)}>Verify</button>
          <button onClick={() => deletePerson(i)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;