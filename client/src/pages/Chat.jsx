import React, { useEffect, useState } from "react";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
export default function Chat() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    if (!localStorage.getItem("chatUser")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chatUser")));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      console.log("This is my current user", currentUser);
      axios.get(`${allUsersRoute}/${currentUser._id}`).then((res) => {
        console.log(res.data);
        setAllUsers(res.data);
      });
    }
  }, [currentUser]);
  return (
    <Container>
      <Contacts allUsers={allUsers} currentUser={currentUser} handleChatChange = {handleChatChange} />
    </Container>
  );
}

const Container = styled.div``;
