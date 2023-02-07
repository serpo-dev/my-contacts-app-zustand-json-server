import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavigateStore } from "../../zustand/navigateStore";
import { useUserStore } from "../../zustand/userStore";
import { Avatar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import statusIcon from "../../assets/statusIcon.png";
import ageIcon from "../../assets/ageIcon.png";
import cityIcon from "../../assets/cityIcon.png";
import idIcon from "../../assets/idIcon.png";
import emailIcon from "../../assets/emailIcon.png";
import { getAnotherUserData } from "../../async/userAsync";

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const userData = useUserStore((state) => state.data);
    const anotherUserData = useUserStore((state) => state.anotherUserData);
    const [data, setData] = useState(userData);

    const navigate = useNavigate();
    const location = useLocation();
    const isNoSearch = !location.search;

    const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
    useEffect(() => {
        setIsLoading(true);

        if (isNoSearch) {
            setCurrentPage("profile");
            setIsLoading(false);
            setData(userData);
            return;
        }
        const id = Number(location.search.split("id=")[1].split("&")[0]);
        if (!id) {
            setCurrentPage("profile");
            navigate("/profile");
            setIsLoading(false);
            setData(userData);
            return;
        }
        const setAnotherUser = async () => {
            const isLoaded = await getAnotherUserData(id);
            if (!isLoaded) {
                setCurrentPage("profile");
                navigate("/profile");
                setIsLoading(false);
                setData(userData);
                return;
            }
        };

        try {
            setAnotherUser();
            setCurrentPage(`profile${location.search}`);
            setData(anotherUserData);
            setIsLoading(false);
            return;
        } catch {
            setCurrentPage("profile");
            navigate("/profile");
            setIsLoading(false);
            setData(userData);
            return;
        }
    }, [location]);

    useEffect(() => {
        setData(anotherUserData);
    }, [anotherUserData]);

    useEffect(() => {
        setData(userData);
    }, [userData]);

    const { id, email, name, surname, age, city, largePic, status } = data;

    const fullName = `${name} ${surname}`;

    if (isLoading) {
        return (
            <div className="w-full h-[70vh] flex flex-row justify-center items-center">
                <CircularProgress size="70px" />
            </div>
        );
    } else {
        return (
            <div className="flex flex-col p-10 space-y-4">
                <div className="flex flex-row space-x-10 mb-4">
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        alt={fullName}
                        src={largePic}
                    />
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-3xl font-semibold mb-4">
                            {fullName}
                        </h1>
                        <h3 className="flex flex-row space-x-2">
                            <img src={statusIcon} className="h-4 mt-1" />
                            <p className="text-[14px]">{status}</p>
                        </h3>
                    </div>
                </div>
                <h3 className="flex flex-row space-x-4 items-center">
                    <img src={idIcon} className="h-6 mt-1" />
                    <span className="font-bold w-16">ID:</span>
                    <p className="text-[18px]">id{id}</p>
                </h3>
                <h3 className="flex flex-row space-x-4 items-center">
                    <img src={emailIcon} className="h-6 mt-1" />
                    <span className="font-bold w-16">EMAIL:</span>
                    <p className="text-[18px]">{email}</p>
                </h3>
                <h3 className="flex flex-row space-x-4 items-center">
                    <img src={ageIcon} className="h-6 mt-1" />
                    <span className="font-bold w-16">AGE:</span>
                    <p className="text-[18px]">{age} years</p>
                </h3>
                <h3 className="flex flex-row space-x-4 items-center">
                    <img src={cityIcon} className="h-6 mt-1" />
                    <span className="font-bold w-16">CITY:</span>
                    <p className="text-[18px]">{city}</p>
                </h3>
            </div>
        );
    }
};
