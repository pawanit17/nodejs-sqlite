# nodejs-sqlite
A module to interact with sqlite from nodejs backend

![Overview of project](Overview.png)

# Database set up
We would be creating a table with the below schema and add some content so that we can work with our NodeJs code.

## Creation of the schema
The following command would create a table in SQLite with the corresponding columns
1. id -> Integer, but autoincremented. Serves as Primary Key.
2. ticket -> The incident or request item from a typical ticketing tool.
3. review_requested_on -> the date on which this request is placed. SQLite does not have the concept of date, so have to use string ( TEXT ).
4. reviewer_id -> the person with who the review is pending.
5. review_result -> should the reviewer reject or approve, this field would have the value set.
6. reviewed_on -> the date on which the reviewer either rejected or approved.

SQL snippet:

`CREATE TABLE reviews ( id INTEGER PRIMARY KEY AUTOINCREMENT, ticket TEXT, review_requested_on TEXT, reviewer_id TEXT, review_result TEXT DEFAULT 'open', reviewed_on TEXT DEFAULT 'NA' );`

## Inserting sample data into the schema
Note that we do not supply any of these fields - 'id', 'review_result' or 'reviewed_on' fields. This is because they are supposed to be that way during the initial insert from NodeJS backend application.

SQL snippet:

`INSERT INTO reviews( ticket, review_requested_on, reviewer_id ) values ( 'INC00001', '29-Jan-2021', 'pdittaka' );`
`INSERT INTO reviews( ticket, review_requested_on, reviewer_id ) values ( 'INC01002', '1-Feb-2021', 'gdheeraj' );`
`INSERT INTO reviews( ticket, review_requested_on, reviewer_id ) values ( 'INC12002', '2-Feb-2021', 'vMarco' );`

## Retrieving data from the database

`SELECT * from reviews;`

1|INC00001|29-Jan-2021|pdittaka|open|NA
2|INC01002|1-Feb-2021|gdheeraj|open|NA
3|INC01036|2-Feb-2021|vmarco|open|NA

## Updating the table data upon reviewer's review
We need to set the updated review result value and review date on that database row where the ticket and review matches. This is because a reviewer could be part of multiple tickets.

SQL snippet:

UPDATE reviews SET review_result = 'Approved', reviewed_on = '05-02-2021 16:44:17' WHERE ticket ='INC00001' AND reviewer_id = 'pdittaka';

## Next up - Cron job?.
