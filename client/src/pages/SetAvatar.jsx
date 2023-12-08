import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import Loader from "../components/Loader/Loader";
import { Buffer } from "buffer";
export default function SetAvatar() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };
  const getAvatar = (e) => {
    console.log("This is the change", e.target.files[0]);
    setSelectedAvatar(e.target.files[0]);
    console.log(selectedAvatar);
  };
  const setProfilePicture=async ()=>{
    if(selectedAvatar==undefined){
        toast.error("Please Upload an Avatar Image",toastOptions);
    } else {
        const user = await JSON.parse()
    }
  }
  return (
    <>
      <Container>
        <div>
          <h1> Upload an image for your Avatar</h1>
        </div>
        <input
          type="file"
          ref={inputRef}
          onChange={getAvatar}
          accept=".png, .jpg, .jpeg"
        />
        <img
          className="w-[100px] h-[100px] rounded-[100%]"
          src={URL.createObjectURL(
            new Blob([selectedAvatar], { type: "application/zip" })
          )}
          alt="Avatar"
        />
      </Container>
      <ToastContainer />
    </>
  );
}
const Container = styled.div``;
