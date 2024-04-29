import React from "react";
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import Chat from "../components/chats/Chat";
import Users from "../components/chats/Users";
import { ChatReducer } from "../components/reducers/ChatReducer";
import { ChatState } from "../components/reducers/states/initState";
import ACTIONS from "../components/reducers/actions";
import { messages } from "../data/messages";

const Chats = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [state, dispatch] = React.useReducer(ChatReducer, ChatState);
  const handleSelectUser = (user) => {
    dispatch({
      type: ACTIONS.SET_CHAT_USER,
      payload: { user: user, messages: messages, isReady: true },
    });
  };
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, bgcolor: "#636262" }}>
      {!isMobile ? (
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "30vw" }}>
            <Users onSelectUser={handleSelectUser} />
          </Box>
          <Box sx={{ width: "70vw" }}>
            <Chat
              selectedUser={state.selectedUser}
              loadedChats={state.messages}
            />
          </Box>
        </Box>
      ) : (
        "This page is build for destop devices, to use in mobile, please download the mobile app"
      )}
    </Box>
  );
};

export default Chats;
