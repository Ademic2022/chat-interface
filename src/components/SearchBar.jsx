import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IoArrowBack } from "react-icons/io5";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  backgroundColor: "#636262",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  // transition: theme.transitions.create("transform"),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = () => {
  const [searchIcon, setSearchIcon] = React.useState("search");

  const handleFocus = () => {
    setSearchIcon("alternate");
  };
  const handleBlur = () => {
    setSearchIcon("search");
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Search>
        <SearchIconWrapper>
          {searchIcon === "search" ? <SearchIcon /> : <IoArrowBack fontSize={23}/>}
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Search>
    </Box>
  );
};

export default SearchBar;
