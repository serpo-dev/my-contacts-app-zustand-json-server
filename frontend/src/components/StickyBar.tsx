import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import searchIcon from "../assets/searchIcon.png";
import contactsIcon from "../assets/contactsIcon.png";
import userIcon from "../assets/userIcon.png";
import { useNavigateStore } from "../zustand/navigateStore";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../zustand/searchStore";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
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

export const StickyBar = () => {
    const currentPage = useNavigateStore((state) => state.currentPage);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const [isPageEnd, setIsPageEnd] = useState(false);

    useEffect(() => {
        const input = searchInput.trim();
        if (!input) {
            navigate(`/${currentPage}`);
            return;
        }
        navigate(`/contacts?search=${input}`);
    }, [searchInput]);

    const fetchContacts = useSearchStore((state) => state.fetchContacts);
    const clearContacts = useSearchStore((state) => state.clearContacts);
    const contacts = useSearchStore((state) => state.contacts);

    useEffect(() => {
        clearContacts();
        if (contacts.length === 0) {
            fetchContacts(searchInput);
        }
    }, [searchInput]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [searchInput]);

    const handleScroll = () => {
        const visible = window.innerHeight + document.documentElement.scrollTop;
        const pageHeight = document.documentElement.scrollHeight;
        if (visible + 100 > pageHeight) {
            setIsPageEnd(true);
        } else {
            setIsPageEnd(false);
        }
    };

    useEffect(() => {
        const isScrollLessThanWindow =
            document.documentElement.scrollHeight <= window.innerHeight;
        if (isPageEnd || isScrollLessThanWindow) {
            fetchContacts(searchInput);
        }
    }, [contacts, isPageEnd]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="ml-14">
                    <NavLink to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            MyContactsApp
                        </Typography>
                    </NavLink>
                    <Box sx={{ flexGrow: 1 }}>
                        <div className="flex">
                            <div className="grow"></div>
                            <div className="grow-0"></div>
                            <Search>
                                <SearchIconWrapper>
                                    <img src={searchIcon} className="h-5" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                            <div className="grow"></div>
                        </div>
                    </Box>
                    <Box
                        className="mr-14 space-x-2"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <NavLink
                            title="Contacts"
                            to="/contacts"
                            className={`${
                                currentPage === "contacts" && "bg-slate-100/25"
                            } p-1 cursor-pointer`}
                        >
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={0} color="error">
                                    <img src={contactsIcon} className="h-8" />
                                </Badge>
                            </IconButton>
                        </NavLink>
                        <NavLink
                            title="Profile"
                            to="/profile"
                            className={`${
                                currentPage === "profile" && "bg-slate-100/25"
                            } p-1 cursor-pointer`}
                        >
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={0} color="error">
                                    <img src={userIcon} className="h-8" />
                                </Badge>
                            </IconButton>
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
