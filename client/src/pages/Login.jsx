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
  useEffect(() => {
    // if (localStorage.getItem("chatUser")) {
    //   navigate("/");
    // }
  }, []);
  return (
    <>
      <FormContainer>
        <div className="flex items-center justify-end h-screen mr-[200px]">
          <form
            className="flex flex-col gap-4 w-1/4 p-5 text-white text-center backdrop-blur-[1px] border-[1px] rounded-md"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="text-[20px] tracking-wider font-bold">LOGIN</div>
            <input
              className="border-[1px] border-black rounded-[100px] p-[5px] px-[10px] bg-transparent placeholder-white"
              type="text"
              placeholder="Username"
              name="userName"
              onChange={(e) => handleChange(e)}
              min="3"
            />
            <input
              className="border-[1px] border-black rounded-[100px] p-[5px] px-[10px] bg-transparent placeholder-white"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <button
              className="border-[1px] border-black p-[5px] tracking-wider font-bold text-white rounded-[100px] hover:bg-black transition ease-in-out duration-300"
              type="submit"
            >
              Login
            </button>
            <span>
              Don't have account?<Link className="ml-[5px]" to="/register">Register Here</Link>
            </span>
          </form>
        </div>  
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div``;

export default Login;
