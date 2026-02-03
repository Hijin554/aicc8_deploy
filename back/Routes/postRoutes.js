const router = require('express').Router()
const {postTask} = require('../Controllers/postTaskController');
router.post('/post_task', postTask);
module.exports = router;

