import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [userData, setUserData] = useState("");

  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);

    if(response.status===200){
      const data=response.data;
      setUser(data);
      localStorage.setItem('token',data.token)
      console.log(data)
      navigate("/home");
    }
    
    setEmail("");
    setPassword("");
    console.log(userData);
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-center">
      <form onSubmit={(e) => submitHandler(e)} action="">
        <img
          className="mb-12 w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base"
          required
          type="email"
          placeholder="email@example.com"
        />

        <h3 className="text-lg font-medium mb-2">Enter password</h3>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base"
          required
          type="password"
          placeholder="enter your password"
        />
        <button className="bg-[#111] font-semibold text-white mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base">
          Login
        </button>
        <p className="pb-2 mb-2 text-center">
          New here?
          <Link to="/signup" className="text-blue-500">
            Create new account
          </Link>
        </p>
        <div>
          <Link
            to={"/captain-login"}
            className="bg-[#ffbf06] flex justify-center font-semibold text-white mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base"
          >
            SignIn as Captain
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
