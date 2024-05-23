const { test, expect } = require("@playwright/test");
const common = require("./common"); //import common functions from ./common.js

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText(["Shared shopping lists", "Statistics"]);
});

test("Can create and list a shopping list.", async ({ page }) => {
  const listName = await common.createList(page);
  await expect(page.getByText(`${listName}`)).toHaveText(listName);
});

test("Can show an individual shopping list.", async ({ page }) => {
  const listName = await common.createList(page);
  await page.getByText(`${listName}`).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

test("Can create and list an item for an individual shopping list.", async ({ page }) => {
  const itemName = await common.createItem(page);
  await expect(page.getByText(`${itemName}`)).toHaveText(itemName);
});

test("Can mark an item as collected.", async ({ page }) => {
  const itemName = await common.createItem(page);
  await page
    .getByRole('row')
    .filter({ hasText: `${itemName}` })
    .getByText("Mark collected!")
    .click();
  await expect(page.locator("del")).toHaveText(itemName);
});

test("Can deactivate a shopping list.", async ({ page }) => {
  const listName = await common.createList(page);
  await page
    .getByRole('row')
    .filter({ hasText: `${listName}` })
    .getByText("Deactivate list!")
    .click();
  await expect(page.getByText(`${listName}`)).toHaveCount(0);
});