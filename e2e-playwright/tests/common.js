// Base functions for 'Creating a shopping list' and 'Creating an item'
module.exports = {
    createList: async function (page) {
        await page.goto("/lists");
        const listName = `New list: ${Math.random()}`;
        await page.locator("input[type=text]").type(listName);
        await page.getByText("Create list!").click();
        return listName;
    },

    createItem: async function (page) {
        const listName = await this.createList(page);
        await page.getByText(`${listName}`).click();
        const itemName = `New item: ${Math.random().toString(36).slice(2, 7)}`;
        await page.locator("input[type=text]").type(itemName);
        await page.getByText("Create item!").click();
        return itemName;
    },
};