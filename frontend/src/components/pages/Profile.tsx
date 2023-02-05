import React, { useEffect } from "react";
import { useNavigateStore } from "../../zustand/navigateStore";
import { useUserStore } from "../../zustand/userStore";

export const Profile = () => {
    const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
    useEffect(() => {
        setCurrentPage("profile");
    }, []);

    const { id, email, name, surname, age, city, largePic, status } =
        useUserStore((state) => state.data);

    return (
        <div>
            <div>{email}</div>
        </div>
    );
};
