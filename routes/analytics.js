const {Router}= require('express')
const router = Router()
const controller = require('../controllers/analytics')
const passport = require('passport')

router.get('/overview',passport.authenticate('jwt', {session: false}), controller.overview)
router.get('/analytics',passport.authenticate('jwt', {session: false}), controller.analytics)
router.get('/month',passport.authenticate('jwt', {session: false}), controller.analyticsMonth)
router.get('/quart',passport.authenticate('jwt', {session: false}), controller.analyticsQuart)
router.get('/half',passport.authenticate('jwt', {session: false}), controller.analyticsHalf)
router.get('/year',passport.authenticate('jwt', {session: false}), controller.analyticsYear)
module.exports = router