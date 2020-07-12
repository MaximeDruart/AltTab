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
    errors.username = "Nom d'utilisateur requis"
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Mail requis"
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Mail invalide"
  }
  // Password checks
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères"
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Les mots de passe doivent être identiques"
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Mot de passe requis"
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmation du mot de passe requis"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
