# MERN App
Simple database entry app.

# Config variables
Backend: `./backend/src/config/`
- DBURL = `mongodb://localhost:27017/entries` [database address - must match mongo port]
- CORSOPTIONS = {origin: `http://localhost:3000`} [allow access from FE - must match App port]
- PORT = 5001 [server port]

Frontend: `./src/shared/config.ts` & `./.env`
- API_ENDPOINT = `http://localhost:5001/api/entries` [API URL - must match server port]
- PORT = 3000 [App port]

# Initiate DB
Using Docker:
    `docker run -p 27017:27017 --name expressdb -d mongo:latest`
    This will start a mongoDB instance in a container running on port 27017

Without Docker:
- Install MongoDB community edition: https://www.mongodb.com/docs/manual/installation/
- For MacOS:
    - Start mongo: `brew services start mongodb-community@6.0`
    - Connect shell to the instance: `mongosh`.
- For other platforms see the above link for details

# Start Backend
- From /backend run `npm i` to install packages
- run `npm run app` to start the server, or `npm run dev` for nodemon with live reloading
- *** The BE runs on port 5001 by default. If this port is in use, you will need to change the BASE_URL in `/src/config.ts` to match the current port ***

# Start Frontend
- From root, run `npm i` 
- run `npm run start`
- *** The FE runs on port 3000 by default.  If this port is in use, you will need to change the CORS origin in `/backend/src/config/server.ts` to match the current port ***

# Build
- BE: `npm run compile`
- FE: `npm run build`

# API endpoints/
All listed parameters are required

__ADD ENTRY__:
- `/api/entries`
- method: POST
- body: {
    title: string;
    author: string;
        text: string;
        date: string; (yyyy-mm-dd)
        time: string; (hh:mm am/pm)
    }
    res: [{
            _id: string;
            title: string;
            author: string;
            text: string;
            date: string; (yyyy-mm-dd)
            time: string; (hh:mm am/pm) 
        }]

__GET ENTRIES__:
- `/api/entries`
- method: GET
- body: n/a
- res: [
            {
                _id: string;
                title: string;
                author: string;
                text: string;
                date: string; (yyyy-mm-dd)
                time: string; (hh:mm am/pm) 
            }, 
            ...
        ]

__UPDATE ENTRY__:
- `/api/entries/:id`
- method: PUT
- body: n/a
- params: id: string
- res: [{
            _id: string;
            title: string;
            author: string;
            text: string;
            date: string; (yyyy-mm-dd)
            time: string; (hh:mm am/pm) 
        }]

__DELETE ENTRY__:
- `/api/entries/:id`
- method: DELETE
- body: n/a
- params: id: string
- res: [{
            message: string
        }]

__GET PDF__:
- `/api/entries/:id`
- method: GET
- body: n/a
- params: id: string
- res: string (base64)


# Suggestions
It would obviously be preferable to have written tests for the components and api service, had time permitted.  
I'd also have liked to refine the error handling, get it production-ready for deployment (move some of the config variables to the .env, run builds, write production instructions, etc.), and there are a couple of magic numbers in the CSS for the form that I'm not happy about.

For improved user experience, the design should be made fully responsive. The table format is of course not ideal for a narrow screen, so an alternative mobile-first design would be required, perhaps displaying the entries in a series of vertically stacked detail cards.
