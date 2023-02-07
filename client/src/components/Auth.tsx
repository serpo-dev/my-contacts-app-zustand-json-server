import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button, TextField } from "@mui/material";
import { loginAsync, registerAsync } from "../async/authAsync";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigateStore } from "../zustand/navigateStore";
import { useForm } from "react-hook-form";
import { useUserStore } from "../zustand/userStore";
import { UserData } from "../interfaces";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export const Auth = () => {
    const setUserData = useUserStore((state) => state.setUserData);

    const { handleSubmit } = useForm();

    const tabNum = useNavigateStore((state) => state.authTabNum);
    const setTabNum = useNavigateStore((state) => state.setAuthTabNum);

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [surnameValue, setSurnameValue] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isSurnameValid, setIsSurnameValid] = useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabNum(newValue);
    };

    const submit = async () => {
        let isError = false;

        if (!emailValue) {
            setIsEmailValid(false);
            isError = true;
        }
        if (!passwordValue) {
            setIsPasswordValid(false);
            isError = true;
        }
        if (!nameValue && tabNum === 1) {
            setIsNameValid(false);
            isError = true;
        }
        if (!surnameValue && tabNum === 1) {
            setIsSurnameValid(false);
            isError = true;
        }
        if (isError) return;

        let data: UserData | undefined;
        try {
            if (tabNum === 0) {
                data = await loginAsync({
                    email: emailValue,
                    password: passwordValue,
                });
            }
            if (tabNum === 1) {
                data = await registerAsync({
                    email: emailValue,
                    password: passwordValue,
                    name: nameValue,
                    surname: surnameValue,
                });
            }
        } catch (e) {
            return handleOpen();
        }

        if (!data) {
            return handleOpen();
        } else {
            new Promise((resolve) => {
                document.location.reload();
                return resolve;
            }).then(() => {
                if (data) {
                    setUserData(data);
                }
            });
        }

        return;
    };

    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="w-[400px] h-fit bg-white rounded-2xl p-8">
                <Box
                    className="rounded-2xl"
                    sx={{ width: "100%", bgcolor: "background.paper" }}
                >
                    <Tabs value={tabNum} onChange={handleChange} centered>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </Box>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="mt-8 mr-8 ml-8 mb-4 space-y-4 flex flex-col justify-center"
                >
                    {tabNum === 1 ? (
                        <div className="flex flex-row space-x-4">
                            <TextField
                                error={!isNameValid}
                                className="w-full"
                                label="Name"
                                variant="outlined"
                                value={nameValue}
                                onChange={(e) => {
                                    setIsNameValid(true);
                                    setNameValue(e.target.value);
                                }}
                                type="text"
                            />
                            <TextField
                                error={!isSurnameValid}
                                className="w-full"
                                label="Surname"
                                variant="outlined"
                                value={surnameValue}
                                onChange={(e) => {
                                    setIsSurnameValid(true);
                                    setSurnameValue(e.target.value);
                                }}
                                type="text"
                            />
                        </div>
                    ) : null}
                    <TextField
                        error={!isEmailValid}
                        className="w-full"
                        label="Email"
                        variant="outlined"
                        value={emailValue}
                        onChange={(e) => {
                            setIsEmailValid(true);
                            setEmailValue(e.target.value);
                        }}
                        type="email"
                    />
                    <TextField
                        error={!isPasswordValid}
                        className="w-full"
                        label="Password"
                        variant="outlined"
                        value={passwordValue}
                        onChange={(e) => {
                            setIsPasswordValid(true);
                            setPasswordValue(e.target.value);
                        }}
                        type="password"
                    />
                    <Button
                        className="h-12"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        {tabNum === 0 ? "Login" : "Register"}
                    </Button>
                </form>

                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h6" component="h2">
                            Error
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            {tabNum === 0
                                ? "Email or password is incorrect. Please try again or contact the support."
                                : "Something went wrong by the server-side reasons. Please reload the page and try again."}
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};
