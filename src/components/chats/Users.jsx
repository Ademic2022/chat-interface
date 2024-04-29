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
import { MdGroups2 } from "react-icons/md";
import { chatIcons } from "../../data/chats";

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRightWidth: "1px",
          height: "8%",
          padding: "0 15px",
          bgcolor: "#636262",
          borderRightColor: "divider",
        }}
      >
        <Typography variant="h6" color="#fff" fontWeight={800}>
          Chats
        </Typography>
        <Box>
          {chatIcons.map((item, idx) => (
            <Tooltip key={idx} title={item.title}>
              <IconButton sx={{ fontSize: `${item.fontSize}`, color: "#fff" }}>
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          height: "90%",
          overflow: "auto",
          bgcolor: "#262525",
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
    </React.Fragment>
  );
};

export default Users;
