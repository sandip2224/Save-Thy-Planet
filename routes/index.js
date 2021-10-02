const express = require('express')
const router = express.Router()

const { blogs, animals } = require("../list")

router.get('/', (req, res) => {
    res.render("home", {
        animals
    })
})

router.get('/home', (req, res) => {
    res.redirect("/")
})

router.get('/animal/:animalName', (req, res) => {
    console.log(req.params.animalName);
})

router.get('/stories', (req, res) => {
    res.render('stories', {
        blogs
    })
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/stories/:storyVal', (req, res) => {
    const storyName = req.params.storyVal
    res.render("story", {
        title: titles[storyName],
        desc: descriptions[storyName]
    })
})

module.exports = router
