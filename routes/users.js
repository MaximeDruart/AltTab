const router = require("express").Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

let User = require("../models/user.model")

router.post("/find/id", (req, res) => {
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

router.get("/find/all/private", auth, (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json(err))
})

// @route POST users/register
// @desc authenticate user
// @access Public
router.post("/register", (req, res) => {
  // check for errors in sent data
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  // check if username or email is already in database
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user) => {
    if (user) {
      if (user.email === req.body.email) return res.status(400).json({ error: "email already taken" })
      if (user.username === req.body.username) return res.status(400).json({ error: "username already taken" })
    }

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

    // hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        // replace user password with the new hashed password
        newUser.password = hash
        // save it in database
        newUser
          .save()
          .then((user) => {
            // sign a token containing user id and send it back along with the user
            jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 * 24 }, (err, token) => {
              if (err) throw err
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                },
              })
            })
          })
          .catch((err) => res.status(400).json(err))
      })
    })
  })
})

// @route POST users/login
// @desc login user
// @access Public
router.post("/login", (req, res) => {
  // check for errors in sent data
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  const { email, password } = req.body

  // check if user exists
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(404).json({ email: "email not found" })

    // check if password corresponds to email
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ password: "incorrect password" })

      // sign a token containing user id and send it back along with the user
      jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 * 24 }, (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        })
      })
    })
  })
})

// @route GET users/info
// @desc get user data. It is private so a token is needed. The middleware function auth will decode the token and send along the decoded data (containing the user id). then this route will get all the data for the user with this id.
// @access Private
router.get("/info", auth, (req, res) => {
  console.log(req)
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
})

module.exports = router
