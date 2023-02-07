import React from "react";
import { StickyBar } from "./StickyBar";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router";
import { Contacts } from "./pages/Contacts";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

export const Main = () => {
    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="w-full">
                <StickyBar />
            </div>
            <Paper
                variant="outlined"
                square
                className="min-h-[85vh] h-fit mb-10 min-w-[400px] w-[50%] max-w-[750px] rounded-b-2xl"
            >
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Paper>
        </div>
    );
};
