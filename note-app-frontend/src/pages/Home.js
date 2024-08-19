import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handelRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <h2>You can process with the registration process</h2>
      <button onClick={handelRegister}>To register Click Me!</button>
    </div>
  );
};

export default Home;
