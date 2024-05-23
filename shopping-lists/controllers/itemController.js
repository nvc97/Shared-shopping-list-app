import * as itermService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createItem = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    await itermService.createItem(urlParts[2], name);
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    await itermService.collectItem(urlParts[4]);

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createItem, collectItem };
