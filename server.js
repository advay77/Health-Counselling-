const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname)))

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Handle form submission
app.post("/api/submit-enquiry", async (req, res) => {
  try {
    const { studentName, email, phone, course, neetScore, state, message } = req.body

    // Validate required fields
    if (!studentName || !email || !phone || !course || !state) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      })
    }

    // Email content for admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: "New Enquiry - MedConsult",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1e3a8a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                        New Student Enquiry
                    </h2>
                    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1f2937; margin-top: 0;">Student Details:</h3>
                        <p><strong>Name:</strong> ${studentName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Course Interest:</strong> ${course}</p>
                        <p><strong>NEET Score:</strong> ${neetScore || "Not provided"}</p>
                        <p><strong>State:</strong> ${state}</p>
                        ${message ? `<p><strong>Message:</strong><br>${message}</p>` : ""}
                    </div>
                    <p style="color: #6b7280; font-size: 14px;">
                        This enquiry was submitted on ${new Date().toLocaleString()}
                    </p>
                </div>
            `,
    }

    // Email content for student (auto-reply)
    const studentMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your enquiry - MedConsult",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #1e3a8a, #10b981); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="color: white; margin: 0;">MedConsult</h1>
                        <p style="color: #e0f2fe; margin: 10px 0 0 0;">Your Gateway to Top Medical Colleges</p>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #1e3a8a;">Thank You, ${studentName}!</h2>
                        <p>We have received your enquiry and our expert counsellors will get back to you within 24 hours.</p>
                        
                        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #1e3a8a; margin-top: 0;">Your Enquiry Details:</h3>
                            <p><strong>Course Interest:</strong> ${course}</p>
                            <p><strong>State:</strong> ${state}</p>
                            ${neetScore ? `<p><strong>NEET Score:</strong> ${neetScore}</p>` : ""}
                        </div>
                        
                        <h3 style="color: #1e3a8a;">What's Next?</h3>
                        <ul style="color: #4b5563; line-height: 1.6;">
                            <li>Our counsellor will call you within 24 hours</li>
                            <li>We'll discuss your career goals and preferences</li>
                            <li>Get personalized college recommendations</li>
                            <li>Receive guidance on admission process</li>
                        </ul>
                        
                        <div style="background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
                            <p style="margin: 5px 0 0 0;">Call us at: +91 98765 43210 | WhatsApp: +91 98765 43210</p>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                            Best regards,<br>
                            Team MedConsult
                        </p>
                    </div>
                </div>
            `,
    }

    // Send emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(studentMailOptions)

    res.json({
      success: true,
      message: "Enquiry submitted successfully! Check your email for confirmation.",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    res.status(500).json({
      success: false,
      message: "There was an error processing your enquiry. Please try again.",
    })
  }
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Visit http://localhost:${PORT} to view the website`)
})
