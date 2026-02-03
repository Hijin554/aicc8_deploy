const router = require('express').Router()
const { updateComplitedTask, updateTask } = require('../Controllers/updateTaskController');
router.patch('/update_completed_task', updateComplitedTask);
router.put('/update_task', updateTask);
module.exports = router;
