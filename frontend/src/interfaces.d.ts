export interface Contact {
    id: number;
    name: string;
    surname: string;
    email: string;
    smallPic: string;
}

export interface ContactState {
    contacts: Array<Contact>;
    length: number;
    page: number;
    fetchContacts(req?: string): void;
    clearContacts: () => void;
    count: number;
}
