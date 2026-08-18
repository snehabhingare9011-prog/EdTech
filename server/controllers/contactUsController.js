const mailSender = require("../utils/mailSender")
const { contactUsEmail } = require("../mail/templates/contactUsEmail")

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