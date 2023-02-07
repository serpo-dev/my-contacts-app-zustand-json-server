import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useUserStore } from "../../zustand/userStore";
import { updateUserData } from "../../async/userAsync";
import { UserData } from "../../interfaces";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { SubmitButton } from "./SubmitButton";

export const SettingsForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const { id, name, surname, age, city, email, status, largePic, smallPic } =
        useUserStore((state) => state.data);

    const { handleSubmit } = useForm();

    const [updName, setUpdName] = useState(name);
    const [updSurname, setUpdSurname] = useState(surname);
    const [updEmail, setUpdEmail] = useState(email);
    const [updAge, setUpdAge] = useState(age);
    const [updCity, setUpdCity] = useState(city);
    const [updStatus, setUpdStatus] = useState(status);
    const [updSmallPic, setUpdSmallPic] = useState(smallPic);
    const [updLargePic, setUpdLargePic] = useState(largePic);

    const updatedData: UserData = {
        id,
        name: updName,
        surname: updSurname,
        age: updAge,
        city: updCity,
        email: updEmail,
        status: updStatus,
        smallPic: updSmallPic,
        largePic: updLargePic,
    };

    const submit = async () => {
        setError(false);
        setSuccess(false);
        setLoading(true);

        const result = await updateUserData(updatedData);

        if (!result) {
            console.log(result);
            setError(true);
            setLoading(false);
            return;
        } else {
            setSuccess(true);
            setLoading(false);

            return setTimeout(() => setSuccess(false), 2000)
        }
    };

    const handleChangeAge = (event: SelectChangeEvent) => {
        setUpdAge(Number(event.target.value));
    };

    const ageList = () => {
        const list = new Array(120).fill("none").map((e, i) => (
            <MenuItem key={i} value={i + 1}>
                {i + 1}
            </MenuItem>
        ));
        return list;
    };

    return (
        <div className="flex flex-row">
            <form
                className="flex flex-col w-full space-y-6"
                onSubmit={handleSubmit(submit)}
            >
                <div className="flex flex-row space-x-6 w-full">
                    <TextField
                        id="outlined-multiline-flexible"
                        className="grow"
                        label="Name"
                        maxRows={1}
                        value={updName}
                        onChange={(e) => setUpdName(e.target.value)}
                        inputProps={{ maxLength: 70 }}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Surname"
                        className="grow"
                        maxRows={1}
                        value={updSurname}
                        onChange={(e) => setUpdSurname(e.target.value)}
                        inputProps={{ maxLength: 70 }}
                    />
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={String(updAge)}
                        label="Age"
                        onChange={handleChangeAge}
                    >
                        {ageList()}
                    </Select>
                </div>
                <div className="flex flex-col space-y-6">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Email"
                        type="email"
                        maxRows={1}
                        value={updEmail}
                        onChange={(e) => setUpdEmail(e.target.value)}
                        inputProps={{ maxLength: 70 }}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="City"
                        maxRows={1}
                        value={updCity}
                        onChange={(e) => setUpdCity(e.target.value)}
                        inputProps={{ maxLength: 70 }}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Status"
                        multiline
                        rows={2}
                        value={updStatus}
                        variant="outlined"
                        onChange={(e) => setUpdStatus(e.target.value)}
                        inputProps={{ maxLength: 150 }}
                    />
                </div>

                <div className="flex flex-row space-x-20 pr-20 pt-10 pb-10 justify-center items-center">
                    <div className="grow flex flex-col space-y-6">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Small profile picture (URL)"
                            maxRows={1}
                            type="url"
                            value={updSmallPic}
                            onChange={(e) => setUpdSmallPic(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Large profile picture (URL)"
                            maxRows={1}
                            type="url"
                            value={updLargePic}
                            onChange={(e) => setUpdLargePic(e.target.value)}
                        />
                    </div>
                    <div>
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                alt="smallPic"
                                src={updSmallPic}
                                sx={{ width: 40, height: 40 }}
                            />
                            <Avatar
                                alt="largePic"
                                src={updLargePic}
                                sx={{ width: 100, height: 100 }}
                            />
                        </Stack>
                    </div>
                </div>
                <SubmitButton
                    success={success}
                    loading={loading}
                    error={error}
                />
            </form>
        </div>
    );
};
