const Validator = require("validator")
const isEmpty = require("is-empty")
module.exports = function validateRegisterInput(data) {
  let errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""
  data.password2 = !isEmpty(data.password2) ? data.password2 : ""
  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username required"
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email required"
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email"
  }
  // Password checks
  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must contain at least 6 characters"
  }
  if (!Validator.isLength(data.password, { max: 30 })) {
    errors.password = "Password must contain at most 30 characters"
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Both password should be identical"
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password required"
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirmation required"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
