const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname))

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Newsletter subscription endpoint
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      })
    }

    // Here you would typically add the email to your newsletter database or service
    // For this example, we'll just send a confirmation email



    res.status(200).json({
      success: true,
      message: "You have successfully subscribed to our newsletter",
    })
  } catch (error) {
    console.error("Error processing newsletter subscription:", error)

    res.status(500).json({
      success: false,
      message: "Failed to subscribe to newsletter. Please try again later.",
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})
