import React, { useEffect } from "react";
import { useNavigateStore } from "../../zustand/navigateStore";

export const Dashboard = () => {
    const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
    useEffect(() => {
        setCurrentPage("");
    }, []);

    return <div>Dashboard</div>;
};
