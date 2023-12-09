import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Contacts({ allUsers, currentUser,handleChatChange }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  
  useEffect(() => {
    console.log("this are all users",allUsers);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.userName);
    }
  }, [currentUser]);
  
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div>
            <h1>Gossip</h1>
          </div>
          <div>
            {allUsers?.map((contact, index) => {
              return (
                <div className="flex" key={index} onClick={()=>{changeCurrentChat(index,contact)}}>
                  {console.log(contact)}
                  <img className="w-[100px]" src={contact.avatarImage} alt={contact.userName} />
                  <h1>{contact.userName}</h1>
                </div>
              );
            })}
          </div>
          <div className="flex">
            <img className="w-[100px]" src={currentUserImage} alt={currentUserName} />
            <h1>{currentUserName}</h1>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div``;
