const otpTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f7fb;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f4f7fb; padding: 40px 15px;"
  >
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background-color: #161d29;
                padding: 30px 20px;
              "
            >

              <a
                href="https://studynotion-edtech-project.vercel.app"
                style="text-decoration: none;"
              >
                <img
                  src="https://i.ibb.co/7Xyj3PC/logo.png"
                  alt="StudyNotion"
                  width="180"
                  style="
                    display: block;
                    max-width: 180px;
                    height: auto;
                    margin: 0 auto;
                  "
                >
              </a>

              <p
                style="
                  color: #cbd5e1;
                  font-size: 14px;
                  margin: 15px 0 0 0;
                "
              >
                Learn • Grow • Achieve
              </p>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px;">

              <!-- Icon -->
              <div
                style="
                  width: 64px;
                  height: 64px;
                  background-color: #fff7cc;
                  border-radius: 50%;
                  margin: 0 auto 20px auto;
                  text-align: center;
                  line-height: 64px;
                  font-size: 30px;
                "
              >
                🔐
              </div>

              <!-- Heading -->
              <h1
                style="
                  margin: 0;
                  text-align: center;
                  font-size: 26px;
                  color: #161d29;
                  font-weight: 700;
                "
              >
                Verify Your Email
              </h1>

              <p
                style="
                  text-align: center;
                  color: #6b7280;
                  font-size: 15px;
                  line-height: 1.6;
                  margin: 12px 0 30px 0;
                "
              >
                Welcome to StudyNotion! Use the verification code below
                to complete your registration.
              </p>

              <!-- OTP Box -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td align="center">

                    <div
                      style="
                        display: inline-block;
                        background-color: #f8fafc;
                        border: 2px dashed #e5e7eb;
                        border-radius: 12px;
                        padding: 20px 40px;
                      "
                    >

                      <p
                        style="
                          margin: 0 0 8px 0;
                          font-size: 12px;
                          color: #6b7280;
                          text-transform: uppercase;
                          letter-spacing: 2px;
                          font-weight: 600;
                        "
                      >
                        Your OTP
                      </p>

                      <div
                        style="
                          font-size: 36px;
                          font-weight: 700;
                          letter-spacing: 10px;
                          color: #161d29;
                          margin-left: 10px;
                        "
                      >
                        ${otp}
                      </div>

                    </div>

                  </td>
                </tr>
              </table>

              <!-- Expiry -->
              <div
                style="
                  background-color: #fff9e6;
                  border-left: 4px solid #ffd60a;
                  padding: 14px 16px;
                  margin-top: 25px;
                  border-radius: 6px;
                "
              >
                <p
                  style="
                    margin: 0;
                    color: #6b5200;
                    font-size: 14px;
                    line-height: 1.5;
                  "
                >
                  ⏱️ <strong>This OTP is valid for 5 minutes.</strong>
                  Please complete the verification before it expires.
                </p>
              </div>

              <!-- Security Message -->
              <p
                style="
                  color: #6b7280;
                  font-size: 14px;
                  line-height: 1.6;
                  margin-top: 25px;
                "
              >
                If you did not request this verification code, you can
                safely ignore this email. Never share your OTP with anyone.
              </p>

              <!-- Divider -->
              <hr
                style="
                  border: 0;
                  border-top: 1px solid #e5e7eb;
                  margin: 30px 0;
                "
              >

              <!-- Support -->
              <p
                style="
                  text-align: center;
                  color: #9ca3af;
                  font-size: 13px;
                  line-height: 1.6;
                  margin: 0;
                "
              >
                Need help?
                <a
                  href="mailto:info@studynotion.com"
                  style="
                    color: #d4a900;
                    text-decoration: none;
                    font-weight: 600;
                  "
                >
                  Contact Support
                </a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                background-color: #f8fafc;
                padding: 20px;
                border-top: 1px solid #e5e7eb;
              "
            >

              <p
                style="
                  margin: 0;
                  color: #9ca3af;
                  font-size: 12px;
                  line-height: 1.5;
                "
              >
                © ${new Date().getFullYear()} StudyNotion. All rights reserved.
              </p>

              <p
                style="
                  margin: 6px 0 0 0;
                  color: #9ca3af;
                  font-size: 12px;
                "
              >
                This is an automated email. Please do not reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

module.exports = otpTemplate;