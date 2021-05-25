const connection = require('./db');

// Constructor
function Student(student) {
    this.StudentName = student.StudentName;
    this.MobileNumber = student.MobileNumber;
    this.Email = student.Email;
    this.StudentYear = student.StudentYear;
    this.Course = student.Course;
}

Student.getAll = (callback) => {
    connection.query('SELECT * FROM Students', (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    })
};

Student.updateById = (id, student, callback) => {
    const sql = `UPDATE Students SET StudentName = COALESCE(?, StudentName), MobileNumber = COALESCE(?, MobileNumber), 
    Email = COALESCE(?, Email), StudentYear = COALESCE(?, StudentYear), Course = COALESCE(?, Course) WHERE StudentID = ?`;
    connection.query(sql, [student.StudentName, student.MobileNumber, student.Email, student.StudentYear, student.Course, id], (err, results) => {
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
}

Student.deleteById = (id, callback) => {
    connection.query('DELETE FROM Students WHERE StudentID = ?', id, (err, results) => {
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
}

Student.create = (student, callback) => {
    connection.query('INSERT INTO Students SET ?', student, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    })
}

module.exports = Student;