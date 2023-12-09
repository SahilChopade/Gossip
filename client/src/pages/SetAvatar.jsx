import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import Loader from "../components/Loader/Loader";
import previewIcon from "../assets/preview_icon.png";
export default function SetAvatar() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };
  const tobase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const getAvatar = async (e) => {
    const image = e.target.files[0];
    try {
      await tobase64(image).then((res) => {
        console.log(res);
        setSelectedAvatar(res);
      });
    } catch (err) {
      console.log("I have got this err", err);
    }
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === "") {
      toast.error("Please Upload an Avatar Image", toastOptions);
    } else {
      console.log("This is selected Avatar", selectedAvatar);
      const user = await JSON.parse(localStorage.getItem("chatUser"));
      axios
        .post(`${setAvatarRoute}/${user._id}`, {
          image: selectedAvatar,
        })
        .then((res) => {
          if (res.data.status) {
            toast.success("Avatar set Successfully!!", toastOptions);
            user.isAvatarImageSet = true;
            user.avatarImage = res.data.image;
            localStorage.setItem("chatUser", JSON.stringify(user));
            navigate("/");
          } else {
            toast.error(
              "OOPs!!Could Not set Avatar. Please Try Again.",
              toastOptions
            );
          }
        });
    }
  };
  return (
    <>
      {isLoading ? (
        <Container>
          <Loader />
        </Container>
      ) : (
        <Container>
          <div>
            <h1>Upload an image for your Avatar</h1>
          </div>
          <input
            type="file"
            ref={inputRef}
            onChange={getAvatar}
            accept=".png, .jpg, .jpeg"
          />
          <h1>Preview</h1>
          {selectedAvatar === undefined ? (
            <img
              className="w-[100px] h-[100px] rounded-sm"
              src={previewIcon}
              alt="preview"
            />
          ) : (
            <img
              className="w-[100px] h-[100px] rounded-[100%]"
              src={selectedAvatar}
              alt="Avatar"
            />
          )}
          <button type="submit" onClick={setProfilePicture}>
            Set Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
const Container = styled.div``;
