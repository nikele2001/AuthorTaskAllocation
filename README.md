1. Create a `.env` file at the root directory with the following variables:

-   These environment variables are for local database usage, where a PostgreSQL database instance is hosted on your local machine.
    -   DB_USER: username of local database account
    -   DB_PASSWORD: password of local database account
    -   DB_NAME: name of local database
    -   DB_HOST: usually localhost
    -   DB_PORT: usually 5432
-   These environment variables are for remote database usage, where a PostgreSQL database instance is hosted remotely.
    -   REMOTE_DB_USER: username of remote database account
    -   REMOTE_DB_PASSWORD: password of remote database account
    -   REMOTE_DB_NAME: name of remote database
    -   REMOTE_DB_HOST: host of remote database. It can usually be found after the `@` symbol in REMOTE_DB_URL
    -   REMOTE_DB_PORT: usually 5432
    -   REMOTE_DB_URL: URL of remote database
-   This environment variable toggles between development mode and production mode, thereby switching between the local database and remote database. For local database, use `localDb` and for remote database, use `remoteDb`.

2. Configure PostgreSQL database, both for remote and local. Consider using ElephantSQL for remote and PgAdmin4 for local.
3. run `npm install` to install all node modules required for backend.
4. run `cd client && npm install && cd ..` to install all node modules required for frontend.
5. run `npm run start:backend` to start the backend.
6. run `npm run start:frontend` to start the frontend.
