# Project 1: Shared shopping list

## The application is deployed at [https://young-paper-5103.fly.dev/](https://young-paper-5103.fly.dev/)

</br>

## I. A brief description of the application

</br>

The project is a simple shopping list application. It allows users to create a shopping list and add different items for each list. The application is built using the [Fly.io](https://fly.io/) platform.

The application follows a three-tier architecture and uses a layered architecture with views, controllers, services, and database. It is structured as follows:

- `controllers` - The controllers are responsible for handling requests by using functions from `services`.
- `services` - The services then use functions from a `database` abstraction.
- `database` - The `database.js` contains the database connection configuration and exports the `sql` command that is used to make queries.
- `views` - The views are stored in a separate folder, and user interface uses a layout.
- `deps.js` - All the dependencies are defined in this file.

</br>

## II. A brief description of the functionality

</br>

### 1. services

- `mainService.js` - Contains functions for counting the statistics at the main page.
- `listService.js` - Contains functions for creating, listing, and deactivating shopping lists.
- `itemService.js` - Contains functions for creating, listing, and collecting items.

### 2. controllers

- `mainController.js` - Contains a function for viewing the main page using functions from `mainService.js`.
- `listController.js` - Contains functions for creating a new list, listing all the lists, view an individual list (with all its items listed), and deactivating shopping lists using functions from `listService.js` as well as `itemService.js`.
- `itemController.js` - Contains functions for creating a new item, and marking items as collected for a specific shopping list using functions from `itemService.js`.

### 3. utils

- `requestUtils.js` - Contains a function for handling redirections.

### 4. app.js

- `app.js` - Each incoming request is first handled by the `handleRequest` function that directs the request to a function of a `controller`.

</br>

## III. Running the application locally

</br>

You can run the application locally with Docker Compose.

First, check that you are in the correct directory that the `docker-compose.yml` file is located within that directory.

Then run the following command:

```properties
docker-compose up --build
```

The application will be available at [http://localhost:7777/](http://localhost:7777/)

</br>

To run the E2E tests, run the following command:

```properties
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
```
