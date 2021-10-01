const express = require('express')
const router = express.Router()

const { t1, d1 } = require("../list")

router.get('/', (req, res) => {
    res.render("home")
})

router.get('/home', (req, res) => {
    res.redirect("/")
})

router.get('/animal/:animalName', (req, res) => {
    console.log(req.params.animalName);
})

router.get('/stories', (req, res) => {
    res.render('stories')
})

router.get('/stories/:storyVal', (req, res) => {
    const storyName = req.params.storyVal
    res.render("story", {
        title: t1[storyName],
        desc: d1[storyName]
    })
})

module.exports = router
