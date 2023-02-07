import { useEffect } from "react";
import { useNavigateStore } from "../../zustand/navigateStore";

export const NotFound = () => {
    const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
    useEffect(() => {
        setCurrentPage("404");
    }, []);

    return <div>404 eror page not found</div>;
};
