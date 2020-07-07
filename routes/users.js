const router = require("express").Router()
const bcrypt = require("bcryptjs")
const keys = require("../config/keys")
const jwt = require("jsonwebtoken")

const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

let User = require("../models/user.model")

router.post("/find", (req, res) => {
  User.findById(req.body.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ error: `No user found for id : ${req.body.id}` }))
})

router.get("/clear", (req, res) => {
  User.remove({})
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json(err))
})

router.get("/find/all", (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json(err))
})

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ error: "email already taken" })

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => res.json(err))
      })
    })
  })
})

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(404).json({ email: "email not found" })

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ password: "password incorrect" })

      const payload = {
        id: user.id,
        firstName: user.firstName,
      }

      jwt.sign(payload, keys.secretOrKey, { expiresIn: 38000 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        })
      })
    })
  })
})

module.exports = router
