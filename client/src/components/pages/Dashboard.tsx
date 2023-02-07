import { useState, useEffect } from "react";
import { useNavigateStore } from "../../zustand/navigateStore";
import { useUserStore } from "../../zustand/userStore";
import Button from "@mui/material/Button";
import { SettingsForm } from "../UI/SettingsForm";
import logoutIcon from "../../assets/logoutIcon.png";

export const Dashboard = () => {
    const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
    useEffect(() => {
        setCurrentPage("");
    }, []);

    const [isDisabled, setIsDisabled] = useState(false);

    const click = () => {
        setIsDisabled(true);
        localStorage.removeItem("token");

        const { clearUserData } = useUserStore.getState();

        setTimeout(() => {
            new Promise(() => window.location.reload()).then(() =>
                clearUserData()
            );
        }, 1000);
    };

    return (
        <div className="p-8 flex-flex-row space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-6">Actions</h2>
                <div className="flex flex-row">
                    <Button
                        onClick={click}
                        variant="contained"
                        disabled={isDisabled}
                    >
                        <div className="flex flex-col space-y-2 p-4 justify-center items-center">
                            <p>Logout from account</p>
                            <img src={logoutIcon} className="h-14 w-14" />
                        </div>
                    </Button>
                    {isDisabled && (
                        <p className="m-2 font-semibold text-red-500">
                            Logging out...
                        </p>
                    )}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                <SettingsForm />
            </div>
        </div>
    );
};
