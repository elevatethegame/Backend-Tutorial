const Student = require('../models/student.model');

module.exports.create = (req, res) => {

    const student = new Student(req.body);

    Student.create(student, (err, data) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.send({message: `Student created with id ${data.insertId}`});
        }
    })

};

module.exports.read = (req, res) => {

    Student.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.send(data);
        }
    });

}

module.exports.update = (req, res) => {

    const student = new Student(req.body);

    Student.updateById(req.body.StudentID, student, (err, data) => {
        if (err) {
            if (err.errorMessage === 'not found') {
                res.status(404).send({message: `No Student with ID ${req.body.StudentID} exists`});
            } else {
                res.status(500).send({message: err.sqlMessage})
            }
        } else {
            res.send({message: `Student with id ${req.body.StudentID} updated`});
        }
    });
    
}

module.exports.delete = (req, res) => {

    Student.deleteById(req.body.StudentID, (err, data) => {
        if (err) {
            if (err.errorMessage === 'not found') {
                res.status(404).send({message: `No Student with ID ${req.body.StudentID} exists`});
            } else {
                res.status(500).send({message: err.sqlMessage})
            }
        } else {
            res.send({message: `Student with id ${req.body.StudentID} deleted`});
        }
    });
    
}