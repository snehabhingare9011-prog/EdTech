exports.courseEnrollmentEmail = (courseNames, name) => {
  const isSingleCourse = courseNames.length === 1;

  const courseContent = isSingleCourse
    ? `
        <p>
          You have successfully enrolled in the course
          <span class="highlight">"${courseNames[0]}"</span>.
        </p>
      `
    : `
        <p>
          You have successfully enrolled in the following courses:
        </p>

        <ul class="courses">
          ${courseNames
            .map(
              (courseName) => `
                <li class="highlight">${courseName}</li>
              `
            )
            .join("")}
        </ul>
      `;

  return `<!DOCTYPE html>
  <html>

  <head>
    <meta charset="UTF-8">

    <title>Course Enrollment Confirmation</title>

    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      .logo {
        max-width: 200px;
        margin-bottom: 20px;
      }

      .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .body {
        font-size: 16px;
        margin-bottom: 20px;
        line-height: 1.6;
      }

      .courses {
        text-align: left;
        margin: 20px auto;
        max-width: 400px;
      }

      .courses li {
        margin-bottom: 8px;
      }

      .highlight {
        font-weight: bold;
      }

      .cta {
        display: inline-block;
        padding: 10px 20px;
        background-color: #FFD60A;
        color: #000000;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 20px;
      }

      .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
      }
    </style>

  </head>

  <body>

    <div class="container">

      <a href="https://studynotion-edtech-project.vercel.app">
        <img
          class="logo"
          src="https://i.ibb.co/7Xyj3PC/logo.png"
          alt="StudyNotion Logo"
        >
      </a>

      <div class="message">
        Course Enrollment Confirmation
      </div>

      <div class="body">

        <p>Dear ${name},</p>

        ${courseContent}

        <p>
          Please log in to your learning dashboard to access
          your ${isSingleCourse ? "course" : "courses"} and
          start your learning journey.
        </p>

        <a
          class="cta"
          href="https://studynotion-edtech-project.vercel.app/dashboard"
        >
          Go to Dashboard
        </a>

      </div>

      <div class="support">
        If you have any questions or need assistance,
        please feel free to reach out to us at
        <a href="mailto:info@studynotion.com">
          info@studynotion.com
        </a>.
        We are here to help!
      </div>

    </div>

  </body>

  </html>`;
};