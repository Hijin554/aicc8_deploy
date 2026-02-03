const router = require('express').Router()
// 'deleteTaskControllers' -> 'deleteTaskController' (실제 파일명 확인 필요)
const {deleteTasks} = require('../controllers/deleteTaskController') 

router.delete('/delete_tasks/:itemId', deleteTasks);

module.exports = router;
