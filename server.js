const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3001
const config = require("config")

// middlewares
app.use(cors())
app.use(express.json())

// mongodb connection
const mongoURI = config.get("mongoURI")
mongoose
  .connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection to mongoDB successful !"))
  .catch((err) => console.log(err))

// routes
const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

// for heroku prod
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
