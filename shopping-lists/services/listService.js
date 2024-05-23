import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true ORDER BY id`;
};

const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;

    if (rows && rows.length > 0) {
        return rows[0];
    } else {
        return { id: 0, name: "Unknown" };
    }
}

const deactivateById = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
}

export { create, findAllActiveLists, findById, deactivateById };