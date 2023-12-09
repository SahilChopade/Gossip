import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
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
      const { password, userName } = values;
      const { data } = await axios.post(loginRoute, {
        userName,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status) {
        toast.success("Logged In Successfully", toastOptions);
        navigate("/");
      }
    }
  };
  const handleValidation = (e) => {
    const { password, userName } = values;
    if (userName.length === "") {
      toast.error("UserName is Required!", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is Required!!", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    if(localStorage.getItem('chatUser')){
      navigate("/");
    }
  },[]);
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
            min="3"
          />
          <input
            className="border-[1px] border-black"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className="border-[1px] border-black" type="submit">
            Login
          </button>
          <span>
            Don't have account?<Link to="/register">Register Here</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div``;

export default Login;
