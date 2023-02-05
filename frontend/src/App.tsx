import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { Auth } from "./components/Auth";
import "./App.css";
import { useUserStore } from "./zustand/userStore";
import { checkAuthAsync } from "./async/authAsync";
import { CircularProgress } from "@mui/material";

function App() {
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const isAuth = useUserStore((state) => state.isAuth);

    const shouldAuthenticate = () => {
        if (!isAuth) return <Auth />;
        return <Main />;
    };

    useEffect(() => {
        const checkAuth = async () => {
            const data = await checkAuthAsync();
            if (data) {
                const setUserData = useUserStore.getState().setUserData;
                setUserData(data);
            }
            setTimeout(() => setIsAppLoaded(true), 1000);
        };
        checkAuth();
    }, []);

    return (
        <div className="min-h-[100vh] bg-blue-50 flex justify-center items-start">
            {isAppLoaded ? (
                <Routes>
                    <Route path="/*" element={shouldAuthenticate()} />
                </Routes>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}

export default App;
