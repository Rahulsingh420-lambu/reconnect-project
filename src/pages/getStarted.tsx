import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="hero">
      <div className="overlay">
        {/* <div className="scroll-indicator">⬇ Scroll</div> */}
        <h1 className="title">Reconnect</h1>
        <h3 className="subtitle">
          Find Missing People. Reunite Families</h3>
        <p className="description">
          Reconnect is a platform dedicated to helping locate missing people and reunite families.
          Join us in our mission to bring hope and closure to those affected by disappearances.
        </p>

        <Link to="/login">
          <button className="btn">Get Started</button>
        </Link>
      </div>
    
    </div>
  );
};

export default GetStarted;