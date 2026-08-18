const mailSender = require("../utils/mailSender")
const { contactUsEmail } = require("../mail/templates/contactUsEmail")
require('dotenv').config();

exports.contactUs = async (req, res) => {
  try {
    const { email, firstName, lastName, message, phoneNumber, countryCode, } = req.body;
    console.log("req.body",req.body);

    if ( !email || !firstName || !lastName || !message || !phoneNumber || !countryCode ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

     // 1️⃣ Send user's message to support email
        await mailSender(
        process.env.MAIL_USER,

        `New Contact Us Message from ${firstName} ${lastName}`,
        
        `
            <h2>New Contact Us Message</h2>

            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${countryCode} ${phoneNumber}</p>

            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
        );

     // 2️⃣ Send confirmation email to user
       await mailSender( email, "Contact Form Confirmation", contactUsEmail( email, firstName, lastName, message, phoneNumber, countryCode ) );


    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully",
    });

  } catch (error) {
    console.log("CONTACT US ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Could not send contact form",
    });
  }
};