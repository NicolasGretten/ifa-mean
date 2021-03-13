const express = require('express')
const router = express.Router()

const verifyParams = require('../middleware/verifyParams')

const ctrl = require('../controllers/clients')

router.get('/', ctrl.getClientList )

router.get('/:id', verifyParams, ctrl.getClient)
router.post('/', ctrl.postClient)
router.put('/:id', verifyParams, ctrl.putClient)
router.patch('/:id', verifyParams, ctrl.patchClient)
router.delete('/:id', verifyParams, ctrl.deleteClient)

module.exports = router