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
      const { password, userName, email } = values;
      axios
        .post(registerRoute, {
          userName,
          email,
          password,
        })
        .then((res) => {
          const id = res.data.user._id;
          if (res.data.status === false) {
            toast.error(res.data.msg, toastOptions);
          }
          if (res.data.status) {
            localStorage.setItem("chatUser", JSON.stringify(res.data.user));
            toast.success("Registered Successfully!!", toastOptions);
            navigate("/setAvatar");
          }
        });
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
        <div className="flex items-center justify-end h-screen mr-[200px]">
          <form
            className="flex flex-col gap-4 w-1/4 p-5 text-white text-center backdrop-blur-[1px] border-[1px] rounded-md"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="text-[20px] tracking-wider font-bold">REGISTER</div>
            <input
              className="border-[1px] border-black rounded-[100px] p-[5px] px-[10px] bg-transparent placeholder-white"
              type="text"
              placeholder="Username"
              name="userName"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="border-[1px] border-black rounded-[100px] p-[5px] px-[10px] bg-transparent placeholder-white"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="border-[1px] border-black rounded-[100px] p-[5px] px-[10px] bg-transparent placeholder-white"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="border-[1px] border-black rounded-[100px] p-[5px] px-[10px] bg-transparent placeholder-white"
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button
              className="border-[1px] border-black p-[5px] tracking-wider font-bold text-white rounded-[100px] hover:bg-black transition ease-in-out duration-300"
              type="submit"
            >
              GET STARTED
            </button>
            <span>
              Already have account?<Link to="/Login">Login Here</Link>
            </span>
          </form>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div``;

export default Register;
