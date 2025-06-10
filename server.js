const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
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

// Contact form API endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, "neet-score": neetScore, message } = req.body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'advayanand87@gmail.com',
      subject: "New Inquiry from Medical Consultancy Website",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #002147; border-bottom: 2px solid #028a0f; padding-bottom: 10px;">New Inquiry Details</h2>
                    
                    <div style="margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        ${neetScore ? `<p><strong>NEET Score:</strong> ${neetScore}</p>` : ""}
                    </div>
                    
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #002147; margin-top: 0;">Message:</h3>
                        <p>${message}</p>
                    </div>
                    
                    <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
                        This email was sent from the contact form on the Medical Consultancy Website.
                    </p>
                </div>
            `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send success response
    res.status(200).json({
      success: true,
      message: "Your inquiry has been submitted successfully",
    })
  } catch (error) {
    console.error("Error sending email:", error)

    res.status(500).json({
      success: false,
      message: "Failed to send your inquiry. Please try again later.",
    })
  }
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Newsletter Subscription Confirmation",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #002147; border-bottom: 2px solid #028a0f; padding-bottom: 10px;">Thank You for Subscribing!</h2>
                    
                    <p>You have successfully subscribed to our newsletter. You will now receive the latest updates on medical admissions, NEET counselling, and more.</p>
                    
                    <p>If you did not request this subscription, please ignore this email.</p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                        <p>MediConsult - Your trusted partner in medical education</p>
                    </div>
                </div>
            `,
    }

    await transporter.sendMail(mailOptions)

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
