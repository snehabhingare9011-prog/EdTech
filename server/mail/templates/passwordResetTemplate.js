const passwordResetTemplate = (url) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            font-family: Arial, Helvetica, sans-serif;
        ">

            <div style="
                width: 100%;
                padding: 50px 0;
            ">

                <div style="
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    padding: 40px;
                    box-sizing: border-box;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                ">

                    <!-- Logo / Brand -->
                    <h1 style="
                        margin: 0 0 30px;
                        text-align: center;
                        color: #161d29;
                        font-size: 28px;
                    ">
                        StudyNotion
                    </h1>

                    <!-- Heading -->
                    <h2 style="
                        margin: 0 0 15px;
                        color: #161d29;
                        font-size: 24px;
                    ">
                        Reset Your Password
                    </h2>

                    <!-- Message -->
                    <p style="
                        margin: 0 0 15px;
                        color: #5a6473;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        We received a request to reset your password.
                    </p>

                    <p style="
                        margin: 0 0 25px;
                        color: #5a6473;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        Click the button below to reset your password.
                        This link will expire in
                        <strong>3 minutes</strong>.
                    </p>

                    <!-- Button -->
                    <div style="
                        text-align: center;
                        margin: 30px 0;
                    ">

                        <a
                            href="${url}"
                            style="
                                display: inline-block;
                                background-color: #ffd60a;
                                color: #161d29;
                                padding: 14px 28px;
                                border-radius: 6px;
                                text-decoration: none;
                                font-size: 16px;
                                font-weight: bold;
                            "
                        >
                            Reset Password
                        </a>

                    </div>

                    <!-- Fallback -->
                    <p style="
                        margin: 25px 0 8px;
                        color: #7a8494;
                        font-size: 13px;
                    ">
                        If the button doesn't work, copy and paste this link
                        into your browser:
                    </p>

                    <a
                        href="${url}"
                        style="
                            color: #0066cc;
                            font-size: 13px;
                            word-break: break-all;
                        "
                    >
                        ${url}
                    </a>

                    <!-- Divider -->
                    <div style="
                        margin: 30px 0;
                        border-top: 1px solid #e5e7eb;
                    "></div>

                    <!-- Footer -->
                    <p style="
                        margin: 0;
                        color: #9ca3af;
                        font-size: 12px;
                        line-height: 1.5;
                    ">
                        If you did not request a password reset,
                        you can safely ignore this email.
                    </p>

                </div>

            </div>

        </body>
        </html>
    `;
};

module.exports = {
    passwordResetTemplate
};