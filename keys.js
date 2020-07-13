// only needed for local run as these keys are stored in environment variables on heroku
module.exports = {
  mongoURI:
    process.env.mongoURI ||
    "mongodb+srv://max:8HJm8X6CILzKxHYB@alttab-bh54v.mongodb.net/AltTab?retryWrites=true&w=majority",
  jwtSecret: process.env.jwtSecret || "alttab_jwtSecret",
}
