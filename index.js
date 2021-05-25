const express = require('express');
const app = express();
const studentController = require('./controllers/student.controller');

app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});

app.route('/students')
   .get(studentController.read)
   .post(studentController.create)
   .put(studentController.update)
   .delete(studentController.delete);

app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
})