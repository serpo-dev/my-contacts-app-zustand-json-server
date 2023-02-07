import { Contact } from "../interfaces";

export class UniqueContactIdSet extends Set {
    constructor(values: Array<Contact>) {
        super(values);

        const ids: Array<number> = [];
        for (let value of this) {
            if (ids.includes(value.id)) {
                this.delete(value);
                continue;
            }
            ids.push(value.id);
        }
    }
}
