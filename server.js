const express = require("express")
const nodemailer = require("nodemailer")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "medconsult", "public")))

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("Email configuration error:", error)
  } else {
    console.log("Email server is ready to send messages")
  }
})

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "medconsult", "public", "index.html"))
})

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, phone, neetScore, service, message } = req.body

    // Validation
    if (!fullName || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      })
    }

    // Phone validation
    const phoneRegex = /^[+]?[\d\s\-$$$$]{10,}$/
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      })
    }

    // Prepare email content
    const emailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="background: #002147; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h2 style="margin: 0;">New Contact Form Submission</h2>
                    <p style="margin: 10px 0 0 0;">MedConsult Pro Website</p>
                </div>
                
                <div style="padding: 20px; background: #f8f9fa;">
                    <h3 style="color: #002147; margin-bottom: 20px;">Contact Details</h3>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold; color: #002147; width: 30%;">Full Name:</td>
                            <td style="padding: 10px;">${fullName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold; color: #002147;">Email:</td>
                            <td style="padding: 10px;"><a href="mailto:${email}" style="color: #028a0f;">${email}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold; color: #002147;">Phone:</td>
                            <td style="padding: 10px;"><a href="tel:${phone}" style="color: #028a0f;">${phone}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold; color: #002147;">Service:</td>
                            <td style="padding: 10px;">${service}</td>
                        </tr>
                        ${
                          neetScore
                            ? `
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold; color: #002147;">NEET Score:</td>
                            <td style="padding: 10px;">${neetScore}</td>
                        </tr>
                        `
                            : ""
                        }
                    </table>
                    
                    <div style="margin-top: 20px;">
                        <h4 style="color: #002147; margin-bottom: 10px;">Message:</h4>
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #028a0f;">
                            ${message.replace(/\n/g, "<br>")}
                        </div>
                    </div>
                </div>
                
                <div style="background: #002147; color: white; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
                    <p style="margin: 0; font-size: 14px;">
                        This email was sent from the MedConsult Pro contact form<br>
                        Received on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                    </p>
                </div>
            </div>
        `

    // Email options
    const mailOptions = {
      from: {
        name: "MedConsult Pro Website",
        address: process.env.EMAIL_USER,
      },
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${service} - ${fullName}`,
      html: emailContent,
      replyTo: email,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send confirmation email to user
    const confirmationEmail = {
      from: {
        name: "MedConsult Pro",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Thank you for contacting MedConsult Pro",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: #002147; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
                    </div>
                    
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
                        <p>Dear ${fullName},</p>
                        
                        <p>Thank you for reaching out to MedConsult Pro. We have received your inquiry regarding <strong>${service}</strong> and will get back to you within 24 hours.</p>
                        
                        <p>Our expert counselors will review your requirements and provide you with personalized guidance for your medical education journey.</p>
                        
                        <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #028a0f;">
                            <h4 style="color: #002147; margin-top: 0;">What happens next?</h4>
                            <ul style="color: #666;">
                                <li>Our team will review your inquiry</li>
                                <li>A counselor will contact you within 24 hours</li>
                                <li>We'll schedule a free consultation call</li>
                                <li>Get personalized guidance for your medical admission</li>
                            </ul>
                        </div>
                        
                        <p>If you have any urgent questions, feel free to call us at <strong>+91 98765 43210</strong>.</p>
                        
                        <p>Best regards,<br>
                        <strong>MedConsult Pro Team</strong></p>
                    </div>
                </div>
            `,
    }

    await transporter.sendMail(confirmationEmail)

    res.status(200).json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    res.status(500).json({
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later.",
    })
  }
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "medconsult", "public", "index.html"))
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error)
  res.status(500).json({
    success: false,
    message: "Internal server error",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Visit: http://localhost:${PORT}`)
})

module.exports = app
