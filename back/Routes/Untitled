const router = require('express').Router()
const {getTasks} = require('../controllers/getControllers')


// :userId 는 정해지지 않은 문자열을 parsms에 전달한다.
router.get('/get_tasks/:userId', getTasks);

module.exports = router;