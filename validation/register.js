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
    errors.username = "nom d'utilisateur requis"
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "mail requis"
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "mail invalide"
  }
  // Password checks
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "le mot de passe doit contenir au moins 6 caractères"
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "les mots de passe doivent être identiques"
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "mot de passe requis"
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "confirmation du mot de passe requis"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
