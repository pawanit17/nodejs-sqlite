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

## SQLITE - Working with dates
Because there is no built in data type to store dates one of the below types could be used to store dates.
- TEXT
- INTEGER
- REAL

Lets see how we can implement this in TEXT storage type.

- Creating the table
```create table datetime_text( d1 text, d2 text );```

- Inserting into the table
```
insert into datetime_text( d1, d2) values ( datetime('now'), datetime('now', 'localtime'));
insert into datetime_text( d1, d2) values ( datetime('2021-04-29 09:15:21'), datetime('now', 'localtime'));
insert into datetime_text( d1, d2) values ( datetime('2021-04-28 09:15:21'), datetime('now', 'localtime'));
insert into datetime_text( d1, d2) values ( datetime('2021-04-27 09:15:21'), datetime('now', 'localtime'));
```

- Querying data by dates

  - Get all content from the table
```
sqlite> select * from datetime_Text;
2021-04-30 09:15:21|2021-04-30 14:45:21
2021-04-29 09:15:21|2021-04-30 14:46:29
2021-04-28 09:15:21|2021-04-30 14:46:42
2021-04-27 09:15:21|2021-04-30 14:46:46
```

  - Find the rows that are between two timestamps
```
sqlite> select * from datetime_Text where d1 between '2021-04-28 09:15:21' and '2021-04-30 09:15:21';
2021-04-30 09:15:21|2021-04-30 14:45:21
2021-04-29 09:15:21|2021-04-30 14:46:29
2021-04-28 09:15:21|2021-04-30 14:46:42
```

  - Find the difference between the column date and now
```
sqlite> select julianday('now') - julianday( d1 ) from datetime_Text;
0.00643041683360934
1.00643041683361
2.00643041683361
3.00643041683361
```

- Find the rows in this table which are older than 2 days.
```
sqlite> select * from datetime_text where julianday('now') - julianday( d1 ) > 2;
2021-04-28 09:15:21|2021-04-30 14:46:42
2021-04-27 09:15:21|2021-04-30 14:46:46
```

## Next up - Cron job?.
