import { renderFile } from "../deps.js";
import * as mainService from "../services/mainService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewMainPage = async (request) => {
    const data = {
        totalLists: await mainService.countAllLists(),
        totalItems: await mainService.countAllItems(),
    };

    return new Response(await renderFile("main.eta", data), responseDetails);
};

export { viewMainPage };