# ui-dev-task

# Initiate DB
Using Docker:
    `docker run -p 27017:27017 --name expressdb -d mongo:latest`

Without Docker:
    - Install MongoDB community edition: https://www.mongodb.com/docs/manual/installation/
    - For MacOS:
        - Start mongo: `brew services start mongodb-community@6.0`
        - Connect shell to the instance: `mongosh`.
    - For other platforms see the above link for details

# Start Backend
- From /backend run `npm i` to install packages
- run `npm run app` to start the server, or `npm run dev` for nodemon live reloading
The server runs on port 5001 by default.

# Start Frontend
- From root, run `npm i` 
- run `npm run start`
*** The FE runs on port 3000 by default.  If this port is in use, you'll need to change the CORS origin in `/backend/src/config/server.ts` to match the current port ***

# Build
- BE: `npm run compile`
- FE: `npm run build`

# API endpoints

__ADD ENTRY__:
    `/api/entries`
    method: POST
    body: {
        title: string;
        author: string;
        text: string;
        date: string; (yyyy/mm/dd)
        time: string; (hh:mm am/pm)
    }
    res: [{
            _id: string;
            title: string;
            author: string;
            text: string;
            date: string; (yyyy/mm/dd)
            time: string; (hh:mm am/pm) 
        }]

__GET ENTRIES__:
    `/api/entries`
    method: GET
    body: n/a
    res: [
            {
                _id: string;
                title: string;
                author: string;
                text: string;
                date: string; (yyyy/mm/dd)
                time: string; (hh:mm am/pm) 
            }, 
            ...
        ]

__UPDATE ENTRY__:
    `/api/entries/:id`
    method: PUT
    body: n/a
    params: id: string
    res: [{
            _id: string;
            title: string;
            author: string;
            text: string;
            date: string; (yyyy/mm/dd)
            time: string; (hh:mm am/pm) 
        }]

__DELETE ENTRY__:
    `/api/entries/:id`
    method: DELETE
    body: n/a
    params: id: string
    res: [{
            message: string
        }]

__GET PDF__:
    `/api/entries/:id`
    method: GET
    body: n/a
    params: id: string
    res: string (base64)

