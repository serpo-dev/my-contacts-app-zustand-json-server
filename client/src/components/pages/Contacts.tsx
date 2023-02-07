import { useEffect, useState } from "react";
import { useNavigateStore } from "../../zustand/navigateStore";
import { useLocation } from "react-router-dom";
import { useContactsStore } from "../../zustand/contactsStore";
import { ContactItem } from "../UI/ContactItem";
import { useSearchStore } from "../../zustand/searchStore";

export const Contacts = () => {
    const { search } = useLocation();
    const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
    const currentPage = useNavigateStore((state) => state.currentPage);

    const [isPageEnd, setIsPageEnd] = useState(false);
   
    const isNoSearch = !search;
    useEffect(() => {
        if (isNoSearch) {
            setCurrentPage("contacts");
        }
    }, [currentPage, search]);

    const contacts = useContactsStore((state) => state.contacts);
    const length = useContactsStore((state) => state.length);
    const searchContacts = useSearchStore((state) => state.contacts);
    const searchLength = useSearchStore((state) => state.length);

    const fetchContacts = useContactsStore((state) => state.fetchContacts);
    const clearContacts = useContactsStore((state) => state.clearContacts);

    useEffect(() => {
        clearContacts();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        const visible = window.innerHeight + document.documentElement.scrollTop;
        const pageHeight = document.documentElement.scrollHeight;
        if (visible + 100 > pageHeight) {
            setIsPageEnd(true);
        } else {
            setIsPageEnd(false);
        }
    };

    useEffect(() => {
        const isScrollLessThanWindow =
            document.documentElement.scrollHeight <= window.innerHeight;
        if (isPageEnd || isScrollLessThanWindow) {
            fetchContacts();
        }
    }, [contacts]);

    if (!search) {
        return (
            <div>
                <h1 className="m-6 text-xl">
                    <span>We found</span>
                    <span className="font-bold">{" " + length + " "}</span>
                    <span>your contacts of which</span>
                    <span>{" " + contacts.length + " "}</span>
                    <span>are shown.</span>
                </h1>
                {contacts.map((elem) => (
                    <ContactItem
                        key={`contacts_${elem.id}`}
                        data={{
                            id: elem.id,
                            name: elem.name,
                            surname: elem.surname,
                            email: elem.email,
                            smallPic: elem.smallPic,
                            isAdded: elem.isAdded,
                        }}
                    />
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="m-6 text-xl">
                    <span>We found</span>
                    <span className="font-bold">
                        {" " + searchLength + " "}
                    </span>
                    <span>result of which</span>
                    <span>{" " + searchContacts.length + " "}</span>
                    <span>are shown.</span>
                </h1>
                {searchContacts.map((elem) => (
                    <ContactItem
                        key={`contacts_${elem.id}`}
                        data={{
                            id: elem.id,
                            name: elem.name,
                            surname: elem.surname,
                            email: elem.email,
                            smallPic: elem.smallPic,
                            isAdded: elem.isAdded,
                        }}
                    />
                ))}
            </div>
        );
    }
};
