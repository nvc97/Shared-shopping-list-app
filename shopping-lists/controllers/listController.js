import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itermService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.create(name);
    return requestUtils.redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
        lists: await listService.findAllActiveLists(),
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const data = {
        list: await listService.findById(urlParts[2]),
        currentItems: await itermService.findCurrentItems(urlParts[2]),
        collectedItems: await itermService.findCollectedItems(urlParts[2]),
    };

    return new Response(await renderFile("list.eta", data), responseDetails);
};

const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const id = urlParts[2];

    await listService.deactivateById(id);
    return requestUtils.redirectTo("/lists");
}

export { addList, viewLists, viewList, deactivateList };