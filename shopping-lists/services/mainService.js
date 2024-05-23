import { sql } from "../database/database.js";

const countAllLists = async () => {
    const row = await sql`SELECT COUNT(*) FROM shopping_lists`;

    if (row && row[0] && row[0].count) {
        return row[0].count;
    }
    return 0;
};

const countAllItems = async () => {
    const row = await sql`SELECT COUNT(*) FROM shopping_list_items`;

    if (row && row[0] && row[0].count) {
        return row[0].count;
    }
    return 0;
};

export { countAllLists, countAllItems };