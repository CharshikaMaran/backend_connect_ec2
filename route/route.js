
const express = require('express');
const router = express.Router();
const studentController = require('../controller/controller');
const logger = require('../middleware/miiddleware');

router.get('/students', logger, studentController.getStudents);
router.post('/students', logger, studentController.addStudent);
router.put('/students/:id', logger, studentController.updateStudent);
router.delete('/students/:id', logger, studentController.deleteStudent);    

module.exports = router;

