import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password , userName, email } = values;
      const { data } = await axios.post(registerRoute, {
        userName,
        email,
        password,
      });
      if(data.status===false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status){
        toast.success("Registered Successfully!!",toastOptions);
        navigate("/");
      }
    }
  };
  const handleValidation = (e) => {
    const { password, confirmPassword, userName, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password Should be same!!",
        toastOptions
      );
      return false;
    } else if (userName.length <= 3) {
      toast.error(
        "userName should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than or equal to 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required!!", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Gossip</h1>
          </div>
          <input
            className="border-[1px] border-black"
            type="text"
            placeholder="userName"
            name="userName"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="border-[1px] border-black"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="border-[1px] border-black"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="border-[1px] border-black"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button className="border-[1px] border-black" type="submit">
            Create User
          </button>
          <span>
            already have account?<Link to="/Login">Login Here</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div``;

export default Register;
