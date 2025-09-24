import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {userContext} from "../context/UserContext";

const UserSignup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData,setUserData]=useState("");

  const navigtate=useNavigate();

  const {user,setUser}=React.useContext(userContext);


  async function submitHandler(e) {
    e.preventDefault();
    const newUser={
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email: email,
      password: password,
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);

    if(response.status===201){
      const data=response.data;
      setUser(data.user);

      localStorage.setItem('token',data.token);

      navigtate('/home');
    }
    
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-center">
      <form onSubmit={(e) => submitHandler(e)} action="">
        <img
          className="mb-12 w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <h3 className="text-lg font-medium mb-2">What's your Fullname</h3>
        <div className="flex gap-2">
          <input
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-1/2 text-lg placeholder:text-sm"
            required
            type="text"
            placeholder="firstname"
          />
          <input
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-1/2 text-lg placeholder:text-sm"
            required
            type="text"
            placeholder="lastname"
          />
        </div>
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
          className="bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-sm"
          reqeuired
          type="password"
          placeholder="enter your password"
        />
        <button className="bg-[#111] font-semibold text-white mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base">
          Create an account
        </button>
        <p className="pb-2 mb-2 text-center">
          Already have an?
          <Link to="/login" className="text-blue-500">
            Login Here
          </Link>
        </p>
        <div>
          <Link
            to={"/captain-signup"}
            className="bg-[#ffbf06] flex justify-center font-semibold text-white mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base"
          >
            SignUp as Captain
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
