import { create } from "zustand";
import { $axiosAuth } from "../http/axios";
import { ContactState, Contact } from "../interfaces";
import { UniqueContactIdSet } from "../handlers/uniqueContactIdSet";

export const useSearchStore = create<ContactState>((set, get) => ({
    contacts: [],
    length: 0,
    page: 1,

    fetchContacts: async (request: string) => {
        const res = await $axiosAuth.get(
            `/contacts?search=${request}&count=${get().count}&page=${
                get().page
            }`
        );

        const length: number = res.data.length;
        const rows: Array<Contact> = res.data.rows;

        if (rows.length === 0) return;

        const newContacts = [
            ...new UniqueContactIdSet([...get().contacts, ...rows]),
        ];

        const newPage =
            newContacts.length === get().contacts.length
                ? get().page
                : get().page + 1;

        return set({
            length: length,
            page: newPage,
            contacts: newContacts,
        });
    },

    clearContacts: () => set({ contacts: [], length: 0, page: 1, count: 1 }),

    // how many contacts to get by the one request
    count: 1,
}));
