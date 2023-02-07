import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

interface SubmitButtonProps {
    loading: boolean;
    success: boolean;
    error: boolean;
}

export const SubmitButton = (props: SubmitButtonProps) => {
    const { loading, success, error } = props;

    const text = () => {
        if (loading) {
            return "loading...";
        }
        if (success) {
            return "Successfully saved!";
        }
        if (error) {
            return "Failed to save! Click to try again.";
        }
        return "Save";
    };

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            "&:hover": {
                bgcolor: green[700],
            },
        }),
        ...(error && {
            bgcolor: "#f44336",
            "&:hover": {
                bgcolor: "#d32f2f",
            },
        }),
    };

    return (
        <Box
            style={{ width: "100%", height: "50px" }}
            sx={{ display: "flex", alignItems: "center" }}
        >
            <Box
                style={{ width: "100%", height: "50px" }}
                sx={{ m: 1, position: "relative" }}
            >
                <Button
                    type="submit"
                    style={{ width: "100%", height: "50px" }}
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                >
                    {text()}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};
