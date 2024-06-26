import React from "react";
import styled from "@emotion/styled";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { customers } from "../../data/customers";
import { chatIcons } from "../../data/chats";
import SearchBar from "../SearchBar";
import { IoFilter } from "react-icons/io5";

const Users = ({ onSelectUser }) => {
  const dummyMessage =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, hic.";
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

  return (
    <React.Fragment>
      <Box
        sx={{
          bgcolor: "#636262",
          position: "fixed",
          top: 0,
          overflow: "hidden",
          height: "100vh",
          width: "30vw",
          color: "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // bgcolor: "#000",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <Typography variant="h6" color="#fff" fontWeight={800}>
            Chats
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {chatIcons.map((item, idx) => (
              <Tooltip key={idx} title={item.title}>
                <IconButton
                  sx={{ fontSize: `${item.fontSize}`, color: "#fff" }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 0.5,
            bgcolor: "#262525",
          }}
        >
          <SearchBar />
          <Tooltip title="Filter Search">
            <IconButton sx={{ fontSize: 24, color: "#fff" }}>
              <IoFilter />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            height: "96.5vh",
            overflow: "auto",
            bgcolor: "#262525",
            pb: 10,
          }}
          className="hide-scrollbar"
        >
          <Box
            sx={{
              display: { xs: "flex", sm: "block" },
              gap: 2,
            }}
          >
            {customers.map(({ id, img, name }) => (
              <ListItemButton
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#fff",
                  ":hover":{
                    bgcolor:"#636262",
                    borderRadius:2,
                  }
                }}
                key={id}
                onClick={() => onSelectUser({ id, name })}
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
                    <Avatar src={img} sx={{ width: "30px", height: "30px" }} />
                  </StyledBadge>

                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography>{name}</Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                      {dummyMessage.slice(0, 20)}...
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    11:12 AM
                  </Typography>
                  <IconButton
                    sx={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: "#fc424a !important",
                      color: "#fff",
                      fontSize: "10px",
                      float: "right",
                    }}
                  >
                    {Math.floor(Math.random() * 10)}
                  </IconButton>
                </Box>
              </ListItemButton>
            ))}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Users;
