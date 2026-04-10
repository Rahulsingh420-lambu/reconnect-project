const Person = {};

export type Person = {
  id?: string;
  name: string;
  age: number;
  location: string;
  image: string;
  description: string;
  status: "missing" | "found";
  verified?: boolean;
};

export default Person;