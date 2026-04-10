const Contact = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Contact / Report Info</h2>

      <p>Email: support@reconnect.com</p>
      <p>Phone: +91 9876543210</p>

      <textarea placeholder="Write your report..." rows={5} />
      <br />
      <button>Submit</button>
    </div>
  );
};

export default Contact;