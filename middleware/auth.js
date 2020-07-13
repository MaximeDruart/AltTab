const jwt = require("jsonwebtoken")

// middleware function that checks if a token is sent with the request and if it's valid AND returns the corresponding user
// will be used by private routes that requires a user login
const auth = (req, res, next) => {
  // get token from request header
  const token = req.header("x-auth-token")

  // if there's no token send 401 : user is unauthorized
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" })

  // verify token
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedData
    next()
  } catch (e) {
    res.status(400).json({ msg: "token is invalid" })
  }
}

module.exports = auth
