import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handelSubmit = async () => {
    // PAYLODE CREATION
    const paylode = {
      name,
      email,
      password,
      age,
      gender,
    };

    // API CALL

    try {
      await fetch("https://dev-notes-backend-olive.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paylode),
      });
      alert("user created successfully");
      navigate("/login");
    } catch (error) {
      alert(`user not created ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <button onClick={handelSubmit}>Submit</button>
    </div>
  );
};

export default Register;
