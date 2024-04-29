import React from "react";
import styled from "@emotion/styled";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { timestampFormatter } from "../utils/chatUtils/time";
import { FiPhoneCall, FiSend, FiVideo } from "react-icons/fi";
import { HiMiniMicrophone } from "react-icons/hi2";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import { ChatReducer } from "../reducers/ChatReducer";
import ACTIONS from "../reducers/actions";
import { ChatState } from "../reducers/states/initState";
import Svg from "../Svg";

const Chat = ({ selectedUser, loadedChats }) => {
  const messagesEndRef = React.useRef(null);
  const [state, dispatch] = React.useReducer(ChatReducer, ChatState);

  React.useEffect(() => {
    if (selectedUser && loadedChats.length > 0) {
      dispatch({
        type: ACTIONS.SET_CHAT_USER,
        payload: { user: selectedUser, messages: loadedChats, isReady: true },
      });
    }
  }, [selectedUser, loadedChats]);

  React.useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleMessageChange = (event) => {
    dispatch({
      type: ACTIONS.SET_NEW_MESSAGE,
      payload: event.target.value,
    });
  };

  const generateMessageId = () => {
    return "m" + Math.random().toString(36).substr(2, 9);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (state.newMessage.trim() !== "") {
      const messageId = generateMessageId();
      const timestamp = new Date().toISOString();
      const message = {
        id: messageId,
        text: state.newMessage,
        createdAt: timestamp,
        user: {
          id: "u2",
          name: "Lukas",
        },
      };
      dispatch({ type: ACTIONS.SET_APPEND_MESSAGE, payload: message });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  }));

  const MessageBox = styled(Box)(({ theme }) => ({
    position: "relative",
    padding: "8px",
    borderRadius: "5px",
    maxWidth: "400px",
    width: "100%",
    bgcolor: "#636262",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      width: "10px",
      height: "10px",
    },
  }));

  return (
    <Box>
      {selectedUser ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "57px",
              padding: "0 10px",
              borderBottom: "0.5px solid #000",
              borderBottomColor: "divider",
              bgcolor: "#636262",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src="/images/avatars/profile-avatar.png"
                  sx={{ width: "30px", height: "30px" }}
                />
              </StyledBadge>

              <Box>
                <Typography color="#fff">{selectedUser.name}</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Tooltip title="Call">
                <IconButton sx={{ fontSize: "17px", color: "#fff" }}>
                  <FiPhoneCall />
                </IconButton>
              </Tooltip>
              <Tooltip title="Video">
                <IconButton sx={{ fontSize: "17px", color: "#fff" }}>
                  <FiVideo />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton sx={{ fontSize: "17px", color: "#fff" }}>
                  <FaEllipsisV />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              height: "84.5vh",
              overflow: "auto",
              p: 1,
              backgroundImage: `url("/chatbg.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {state.messages.length > 0 ? (
              state.messages.map(({ id, text, user, createdAt }) => (
                <Box key={id}>
                  <Box
                    sx={{
                      display: "flex",
                      mt: 2,
                      justifyContent:
                        user.id === "u1" ? "flex-start" : "flex-end",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      src={`${
                        user.id === "u1"
                          ? "/images/avatars/profile-avatar.png"
                          : "/images/avatars/avatar3.png"
                      }`}
                      sx={{
                        width: "30px",
                        height: "30px",
                        order: user.id === "u2" && 2,
                      }}
                    />

                    <Box>
                      <MessageBox
                        sx={{
                          backgroundColor:
                            user.id === "u1" ? "#636262" : "chatBox",
                          color: user.id === "u1" && "#fff",
                          "&::before": {
                            backgroundColor:
                              user.id === "u1" ? "#636262" : "chatBox",
                            transform: `rotate(45deg) ${
                              user.id === "u1"
                                ? "translateX(-7px)"
                                : "translateX(7px)"
                            } `,
                            left: user.id === "u1" && 0,
                            right: user.id === "u2" && 0,
                            top: user.id === "u1" && "10px !important",
                          },
                        }}
                      >
                        {text}
                      </MessageBox>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          opacity: 0.8,
                          fontStyle: "italic",
                          color: "#fff",
                        }}
                      >
                        {timestampFormatter(createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Typography>
                  No chats to display. Start a conversation!
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 2,
                paddingLeft: 1,
                fontSize: "22px",
              }}
            >
              <BsEmojiSmileFill />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 1.5,
                fontSize: "22px",
              }}
            >
              <FaPlus />
            </Box>
            <Box
              sx={{
                mt: 1,
                bgcolor: "#262525",
                width: "60vw",
                borderRadius: 1,
              }}
            >
              <TextField
                id="input-with-icon-textfield"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar sx={{ width: "20px", height: "20px" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Send">
                        <IconButton
                          sx={{ fontSize: "17px", color: "#fff" }}
                          onClick={handleSendMessage}
                        >
                          <FiSend />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                  style: { color: "#fff" },
                }}
                variant="outlined"
                fullWidth
                size="small"
                value={state.newMessage}
                placeholder="Enter a message"
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 1.5,
                fontSize: "25px",
              }}
            >
              <HiMiniMicrophone />
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#636262",
            color: "#fff",
          }}
        >
          <Svg />
          <Typography variant="h4" fontWeight={800}>
            FastLink Web
          </Typography>
          <Typography variant="h6" width="65%" textAlign="center">
            Send and receive messages without keeping your phone online. Use
            FastLink on up to 4 linked devices and 1 phone at the same time.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
