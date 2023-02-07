export interface Contact {
    id: number | undefined;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    smallPic: string | undefined;
    isAdded: boolean | undefined;
}

export interface ContactState {
    contacts: Array<Contact>;
    length: number;
    page: number;
    fetchContacts(req?: string): void;
    clearContacts: () => void;
    count: number;
}

export interface UserData {
    id: number | undefined;
    name: string | undefined;
    surname?: string | undefined;
    email: string | undefined;
    city?: string | undefined;
    age?: number | undefined;
    smallPic?: string | undefined;
    largePic?: string | undefined;
    status?: string | undefined;
}