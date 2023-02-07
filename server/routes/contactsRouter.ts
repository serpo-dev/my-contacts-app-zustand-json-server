const Router = require("express");
const db = require("../db.json");
import { Request, Response, NextFunction } from "express";
import * as JsSearch from "js-search";
import jwt_decode from "jwt-decode";

interface Decoded {
    email: string;
    iat: number;
    exp: number;
    sub: string;
}

interface ContactModel {
    id: number;
    userId: number;
    to: number;
}

interface findContacts {
    where: { userId: number };
}

interface selectContacts {
    count: number;
    page: number;
}

interface UserData extends Object {
    id?: number;
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
    age?: number;
    city?: string;
    status?: string;
    smallPic?: string;
    largePic?: string;
}

interface ContactWithData {
    id: number | undefined;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    smallPic: string | undefined;
    isAdded?: boolean | undefined;
}

const getAllContacts = (object: Array<ContactModel>, options: findContacts) => {
    const id = options.where.userId;

    let i = 0;
    let results: Array<ContactModel> = [];
    while (i < object.length) {
        if (object[i].userId == id) {
            results.push(object[i]);
        }
        i++;
    }
    return results;
};

const addAddedStatusToContacts = (
    draft: Array<ContactWithData>,
    addedList: Array<ContactModel>
) => {
    const result = draft.map((contact) => {
        let isAdded = false;
        for (let i = 0; i < addedList.length; i++) {
            if (contact.id === addedList[i].to) {
                isAdded = true;
                break;
            }
        }
        return { ...contact, isAdded };
    });
    return result;
};

function selectContacts<T>(object: Array<T>, options: selectContacts) {
    const { count, page } = options;
    const start = count * (page - 1);
    const results: Array<T> = object.slice(start, start + count);
    return results;
}

const findDataToRows = (rows: Array<ContactModel>) => {
    const users = db.users;
    const foundWithData: Array<ContactWithData> = rows.map((item) => {
        const contactUserId = item.to;
        const foundUser = users.find(
            (user: UserData) => user.id === contactUserId
        );
        const { id, name, surname, email, smallPic } = foundUser;
        return { id, name, surname, email, smallPic, isAdded: true };
    });
    return foundWithData;
};

class contactsController {
    search(req: Request, res: Response, next: NextFunction) {
        const { search, count, page } = req.query;
        if (!search) return next();
        const typedSearch = String(search);
        const typedCount = Number(count);
        const typedPage = Number(page);
        const users = db.users;

        const searchInstance = new JsSearch.Search("id");
        searchInstance.addIndex("name");
        searchInstance.addIndex("surname");
        searchInstance.addIndex("email");
        searchInstance.addDocuments([...users]);
        const found: Array<UserData> = searchInstance.search(typedSearch);
        const rowsWithData: Array<ContactWithData> = found.map((item) => {
            return {
                id: item.id,
                name: item.name,
                surname: item.surname,
                email: item.email,
                smallPic: item.smallPic,
            };
        });

        const rows: Array<ContactWithData> = selectContacts<ContactWithData>(
            rowsWithData,
            { count: typedCount, page: typedPage }
        );

        //  find all users's added contacts

        const token = req.headers.authorization?.split(" ")[1] || "";
        const { sub } = jwt_decode<Decoded>(token);
        const userId = Number(sub);

        const contacts = db.contacts;
        const addedContacts: Array<ContactModel> = getAllContacts(contacts, {
            where: { userId },
        });

        const rowsWithAddedStatus = addAddedStatusToContacts(
            rows,
            addedContacts
        );

        return res.status(200).json({
            length: found.length,
            rows: rowsWithAddedStatus,
        });
    }

    userContacts(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const count = Number(req.query.count);
        const page = Number(req.query.page);

        const contacts = db.contacts;
        const found: Array<ContactModel> = getAllContacts(contacts, {
            where: { userId },
        });
        const rows = selectContacts<ContactModel>(found, { count, page });
        const rowsWithData = findDataToRows(rows);

        return res
            .status(200)
            .json({ length: found.length, rows: rowsWithData });
    }
}

const controller = new contactsController();

const contactsRouter = new Router();
contactsRouter.get("/", controller.search);
contactsRouter.get("/:userId", controller.userContacts);

module.exports = contactsRouter;
