import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../config/apiUrl";
import { AuthContext } from "../../context/authContext";

function Register(props) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

  // useEffect(() => {
  //   if (login) {
  //     navigate("/");
  //   }
  // });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username: inputs.username,
        email: inputs.email,
        name: inputs.name,
        password: inputs.password,
      });
      toast.success("Success");
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data);
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            and scrambled it to make a type specimen book.
          </p>
          <span>Do you have an account?</span>
          <Link to="/Login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
