const {Router}= require('express')
const router = Router()
const controller = require('../controllers/order')
const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/',passport.authenticate('jwt', {session: false}), controller.create)

module.exports = router