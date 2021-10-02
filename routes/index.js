const express = require('express')
const sgMail = require('@sendgrid/mail')
const Razorpay = require('razorpay')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const { ensureAuth, ensureGuest } = require('../middleware/auth')

const razorpay = new Razorpay({
    key_id: process.env.keyId,
    key_secret: process.env.keySecret
})
const router = express.Router()

const { blogs, animals } = require("../utils/list")

// GET login
router.get('/member/register', ensureGuest, (req, res) => {
    res.render("register", {
        layout: 'register'
    })
})

// GET login
router.get('/member/login', ensureGuest, (req, res) => {
    res.render("login", {
        layout: 'login'
    })
})

// @GET /home
router.get('/', (req, res) => {
    res.render("home", {
        keyId: process.env.keyId,
        animals
    })
})

// @GET /home
router.get('/home', (req, res) => {
    res.redirect("/")
})

// @GET /stories
router.get('/stories', (req, res) => {
    res.render('stories', {
        blogs,
        keyId: process.env.keyId
    })
})

// @GET /contact_page
router.get('/contact', (req, res) => {
    res.render('contact', {
        keyId: process.env.keyId
    })
})

// @POST /contact_form
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

// @POST /membership_form
router.post('/form2', (req, res) => {
    console.log(req.body)
    const msg = {
        to: 'sandipan2224@gmail.com',
        from: 'sandipan2224@gmail.com',
        subject: `Membership Email from ${req.body.name}`,
        text:
            `
            Name: ${req.body.name}
            Email: ${req.body.email}
            Message: ${req.body.reason}
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

// @GET /mail_transfer_success
router.get('/success', (req, res) => {
    res.render('error/successMail')
})

// @GET /mail_transfer_fail
router.get('/failure', (req, res) => {
    res.render('error/failureMail')
})

// @POST /payment_success_or_fail
router.post('/success', (req, res) => {
    razorpay.payments.fetch(req.body.razorpay_payment_id).then(paymentDocument => {
        if (paymentDocument.status === 'captured') {
            res.render("error/successPayment")
        }
        else {
            res.render("error/failurePayment")
        }
    })
})

// @GET /story
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

// @POST /payment_gateway
router.post('/order', (req, res) => {
    var options = {
        amount: 50000,
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    razorpay.orders.create(options, (err, order) => {
        res.json(order)
    });
})

// @GET /test
router.get('/member', ensureAuth, (req, res) => {
    res.render('test', {
        name: req.user.firstName
    })
})

// @GET /facts
router.get('/facts', (req, res) => {
    res.render('facts', {
        keyId: process.env.keyId
    })
})

module.exports = router
