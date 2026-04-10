import type { Person } from "../types/person";

const PersonCard = ({ data }: { data: Person }) => {
  return (
    <div className="card">
      <img
        src={data.image || "https://via.placeholder.com/150"}
        width="100%"
      />
      <h3>{data.name}</h3>
      <p>{data.location}</p>
      <p>{data.description}</p>
      <span>{data.status}</span>
    </div>
  );
};

export default PersonCard;