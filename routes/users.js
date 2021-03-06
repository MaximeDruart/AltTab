const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

let User = require("../models/user.model")
const { getRandomAvatarOptions } = require("../utils/main")

const userException = (status, message) => ({
  status,
  message,
})

// @route POST users/buy
// @desc buy item
// @access Private
router.post("/buy", auth, async (req, res) => {
  const { item } = req.body
  try {
    let user = await User.findById(req.user.id)
    if (user && item) {
      if (user.money >= item.price) {
        if (!user.acquiredItems[item.type].includes(item.name)) {
          user.money -= item.price
          user.acquiredItems[item.type] = [...user.acquiredItems[item.type], item.name]
          user = await user.save()
          return res.json(user.getPublicFields())
        } else throw userException(403, "Item already in inventory")
      } else throw userException(403, "Not enough money dawg")
    } else throw userException(404, "User or item not found")
  } catch (error) {
    return res.status(error.status).json({ error: error.message })
  }
})

// @route POST users/edit/avatar
// @desc edits avatar
// @access Private
router.post("/edit/avatar", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: req.body.avatar })
    // findByIdAndUpdate actually sends back the matched document not the one after edit so i'm sending it with avatar as sent in request body
    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: req.body.avatar,
      money: user.money,
      acquiredItems: user.acquiredItems,
    })
  } catch (error) {
    return res.status(404).json(error)
  }
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
      if (user.email === req.body.email) return res.status(400).json({ email: "email already taken" })
      if (user.username === req.body.username) return res.status(400).json({ username: "username already taken" })
    }

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: getRandomAvatarOptions(),
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
            jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 * 24 }, (err, token) => {
              if (err) throw err
              res.json({
                token,
                user: user.getPublicFields(),
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
      jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 * 24 }, (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: user.getPublicFields(),
        })
      })
    })
  })
})

// @route GET users/info
// @desc get user data. It is private so a token is needed. The middleware function auth will decode the token and send along the decoded data (containing the user id). then this route will get all the data for the user with this id.
// @access Private
router.get("/info", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password -createdAt -updatedAt -__v")
    .then((user) => {
      return res.json(user)
    })
})

module.exports = router
