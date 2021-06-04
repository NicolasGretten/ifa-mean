const express = require('express')
const router = express.Router()

const verifyParams = require('../middleware/verifyParams')

const ctrl = require('../controllers/users')
const ctrlTasks = require('../controllers/tasks')

router.get('/', ctrl.getUserList )
router.post('/', ctrl.postUser)

router.post('/connect', ctrl.connectUser)

router.get('/:id', verifyParams, ctrl.getUser)
router.put('/:id', verifyParams, ctrl.putUser)
router.delete('/:id', verifyParams, ctrl.deleteUser)

router.post('/:id/tache', ctrlTasks.postTask)
router.put('/:id/tache/:num', verifyParams, ctrlTasks.putTask)
router.delete('/:id/tache/:num', verifyParams, ctrlTasks.deleteTask)

module.exports = router
