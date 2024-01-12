# Author Task Allocation Project

This project is a full stack application for managing tasks. This application entails a RESTful API build using Loopback 3 (now deprecated) for the backend and a web frontend using EmberJS. This application allow users to manage tasks, each of which is associated with an author.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   You have installed the latest version of Node.js and npm.
-   You have a local or remote PostgreSQL database.

## Setting Up

Follow these steps to set up your local development environment:

1. **Environment Variables**: Create a `.env` file at the root directory with the following variables:

    - **Local Database Configuration**:

        - `DB_USER`: username of local database account
        - `DB_PASSWORD`: password of local database account
        - `DB_NAME`: name of local database
        - `DB_HOST`: usually localhost
        - `DB_PORT`: usually 5432

    - **Remote Database Configuration**:

        - `REMOTE_DB_USER`: username of remote database account
        - `REMOTE_DB_PASSWORD`: password of remote database account
        - `REMOTE_DB_NAME`: name of remote database
        - `REMOTE_DB_HOST`: host of remote database. It can usually be found after the `@` symbol in `REMOTE_DB_URL`
        - `REMOTE_DB_PORT`: usually 5432
        - `REMOTE_DB_URL`: URL of remote database

    - `ENV`: This environment variable toggles between development mode and production mode, thereby switching between the local database and remote database. For local database, use `localDb` and for remote database, use `remoteDb`.

2. **Database Setup**: Configure your PostgreSQL database, both for remote and local. Consider using ElephantSQL for remote and PgAdmin4 for local.

3. **Backend Dependencies**: Run `npm install` to install all node modules required for the backend.

4. **Frontend Dependencies**: Run `cd client && npm install && cd ..` to install all node modules required for the frontend.

## Running the Application

1. **Start the Backend**: Run `npm run start:backend` to start the backend.

2. **Start the Frontend**: Run `npm run start:frontend` to start the frontend.
