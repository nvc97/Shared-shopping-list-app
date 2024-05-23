import { serve, configure } from "./deps.js";
import * as mainController from "./controllers/mainController.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (request.method === "GET" && url.pathname === "/") {
    return await mainController.viewMainPage();
  } else if (request.method === "GET" && url.pathname === "/lists") {
    return await listController.viewLists(request);
  } else if (request.method === "GET" && url.pathname.match("lists/[0-9]+")) {
    return await listController.viewList(request);
  } else if (request.method === "POST" && url.pathname === "/lists") {
    return await listController.addList(request);
  } else if (request.method === "POST" && url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect")) {
    return await itemController.collectItem(request);
  } else if (request.method === "POST" && url.pathname.match("/lists/[0-9]+/items")) {
    return await itemController.createItem(request);
  } else if (request.method === "POST" && url.pathname.includes("deactivate")) {
    return await listController.deactivateList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
