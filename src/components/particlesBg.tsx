import Particles from "react-tsparticles";

const ParticlesBg = () => {
  return (
    <Particles
      options={{
        background: { color: "#020617" },
        particles: {
          number: { value: 60 },
          size: { value: 2 },
          move: { enable: true, speed: 1 },
          links: { enable: true },
        },
      }}
    />
  );
};

export default ParticlesBg;