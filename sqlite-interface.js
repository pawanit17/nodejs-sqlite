var sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database.
let db = new sqlite3.Database('D:\\Development\\sqlite\\workflows_dev', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
    console.error(err.message);
    }

    console.log('Connected to the Workflows database.');
});

// Inserting a new row into the table.
// Ex: INSERT INTO reviews( ticket, review_requested_on, reviewer_id ) VALUES ( 'INC00001', '29-Jan-2021', 'pdittaka' );
function insertReviewRecord( ticketNumber, reviewer_id ) {

    let now = new Date().toISOString().
                        replace(/T/, ' ').      // replace T with a space
                        replace(/\..+/, '')     // delete the dot and everything after

    let data = [ticketNumber, now, reviewer_id];
    let sql = `INSERT INTO reviews( ticket, review_requested_on, reviewer_id ) values ( ?, ?, ? )`

    db.run(sql, data, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
    });
}

// Updating an existing row into the table.
// Ex: UPDATE reviews SET review_result = 'Approved', reviewed_on = '05-02-2021' WHERE ticket ='INC13409' AND reviewer_id = 'rvalden';
// Ex: '2012-11-04 14:55:45'
function updateReviewRecord( ticketNumber, reviewer_id, review_result )
{
    let now = new Date().toISOString().
                        replace(/T/, ' ').      // replace T with a space
                        replace(/\..+/, '')     // delete the dot and everything after

    let data = [ review_result, now, ticketNumber, reviewer_id];
    let sql = `UPDATE reviews SET review_result = ?, reviewed_on = ? WHERE ticket = ? AND reviewer_id = ?`

    db.run(sql, data, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
    });
}

insertReviewRecord( "REQ9978", "ychandolu" );
updateReviewRecord( 'REQ9978', 'ychandolu', 'Reject' )

// close the database connection
// Do I never need it?.
function closeConnection() {
    db.close();
}

// Exporting the two methods.
exports.insertReviewRecord = insertReviewRecord;
exports.updateReviewRecord = updateReviewRecord;
