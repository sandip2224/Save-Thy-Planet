const express = require('express')
const passport = require('passport')

const router = express.Router()

// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/member')
})

// @route GET /auth/logout
router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/home')
})

module.exports = router