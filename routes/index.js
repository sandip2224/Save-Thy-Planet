const express = require('express')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

router.get('/stories', (req, res) => {
    res.render('stories', {
        blogs
    })
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.post('/form', (req, res) => {
    console.log(req.body)
    const msg = {
        to: 'sandipan2224@gmail.com',
        from: 'sandipan2224@gmail.com',
        subject: `Email from ${req.body.name}`,
        text:
            `
            Name: ${req.body.name}
            Email: ${req.body.email}
            Message: ${req.body.text}
            `
    }
    sgMail
        .send(msg)
        .then(() => {
            res.redirect('/success')
        })
        .catch((error) => {
            console.error(error)
            res.redirect('/failure')
        })
})

router.get('/success', (req, res) => {
    res.render('error/successMail')
})

router.get('/failure', (req, res) => {
    res.render('error/failureMail')
})

router.get('/stories/:storyVal', (req, res) => {
    const storyName = req.params.storyVal
    console.log(storyName)
    blogs.forEach(blog => {
        if (blog.title === storyName) {
            res.render("story", {
                blogval: blog
            })
        }
    })
})

module.exports = router
