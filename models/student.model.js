const pool = require('./db');

// Constructor
function Student(student) {
    this.StudentName = student.StudentName;
    this.MobileNumber = student.MobileNumber;
    this.Email = student.Email;
    this.StudentYear = student.StudentYear;
    this.Course = student.Course;
}

Student.getAll = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * FROM Students', (err, results) => {
            connection.release(); // always put connection back in pool after last query
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    })
};

Student.updateById = (id, student, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        const sql = `UPDATE Students SET StudentName = COALESCE(?, StudentName), MobileNumber = COALESCE(?, MobileNumber), 
        Email = COALESCE(?, Email), StudentYear = COALESCE(?, StudentYear), Course = COALESCE(?, Course) WHERE StudentID = ?`;
        connection.query(sql, [student.StudentName, student.MobileNumber, student.Email, student.StudentYear, student.Course, id], (err, results) => {
            connection.release(); // always put connection back in pool after last query
            if (err) {
                callback(err, null);
                return;
            }
            if (results.affectedRows <= 0) {
                callback({ errorMessage: 'not found' }, null);
                return;
            }
            callback(null, results);
        })
    })
};

Student.deleteById = (id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        connection.query('DELETE FROM Students WHERE StudentID = ?', id, (err, results) => {
            connection.release(); // always put connection back in pool after last query
            if (err) {
                callback(err, null);
                return;
            }
            if (results.affectedRows <= 0) {
                callback({ errorMessage: 'not found' }, null);
                return;
            }
            callback(null, results);
        })
    })
};

Student.create = (student, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        connection.query('INSERT INTO Students SET ?', student, (err, results) => {
            connection.release(); // always put connection back in pool after last query
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    })
};

module.exports = Student;