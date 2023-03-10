# UI Developer tasks

Typescript code for CRUD of multiple database entries. The code has three parts to be completed, Task1, Task2, and Task3.

The application should be created with the *React* library and *MongoDB*.

## Task1: Create Back-end & define API

### Database
Create a database in MongoDB

Create a collection that has 6 fields:
1. Unique ID
2. Title
3. Text
4. Date
5. Time
6. Author

### Endpoints

Create an endpoint that receives the text, author, date, and time from the front end and stores it in the database. The database generates the id.

## Task2: Create Front-end/Integration with Back-end

### Create

Text, title, author, date, and time are generated by the user in the front end and sent to the back end. The back end is responsible to store it in the database.

Data input should drop down a calendar to choose a date from.

Time should drop down a selection of the hour, minute, and am/pm.

### Read

In the front end create another tab that retrieves all the entries from the back end. All the entries are listed in a table.

### Update

The user can update the title, text, author, date, or time. The data are not held in the backend. Everything is stored in the MongoDB.

### Delete

Add functionality to the front-end/backend to delete any entries from the database.

## Task 3

The user is now able to convert any of the entries to the database to a pdf. Once the request is made from the front end
1. The backend retrieves the information of the selected entry and
2. converts it to a pdf.
3. The pdf is sent back to the front end.
4. The pdf is downloaded automatically.

The pdf structure is the following
```
Title

Author

Date-Time

Text
```
Styling:

Title font-size: 18px

Author font-size: 16px

Date/time font-size: 14px

Text font-size: 12px

## Documentation

Present clear documentation in a *README.md* file.
For example, installing and running the application  :
```bash
[user@device] $ nmp install
[user@device] $ npm start
```

All endpoints are documented as well as their APIs.
For example:

__Rectangle Endpoint__:

|text|title| author | date| time |
|---|--| --|--|--|
|Lorem ipsum...|Lorem Ipsum|George R. R. Martin|15/01/2023| 19:35:04 |

## Suggestions.
What would you have done better to optimize this application?
