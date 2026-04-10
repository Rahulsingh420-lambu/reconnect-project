const InputField = ({ ...props }: any) => {
  return (
    <input
      {...props}
      style={{ padding: "10px", margin: "5px", width: "250px" }}
    />
  );
};

export default InputField;