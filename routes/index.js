const express = require('express')
const sgMail = require('@sendgrid/mail')
const Razorpay = require('razorpay')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const razorpay = new Razorpay({
    key_id: process.env.keyId,
    key_secret: process.env.keySecret
})
const router = express.Router()

const { blogs, animals } = require("../list")

router.get('/', (req, res) => {
    res.render("home", {
        keyId: process.env.keyId,
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

module.exports = router
