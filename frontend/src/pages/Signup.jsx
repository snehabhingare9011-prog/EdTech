import React from 'react'
import Template from '../components/core/Authentication/Template';
import signupImage from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";

const Signup = () => {
  const heading = "Join the millions learning to code with StudyNotion for free";
  const description1 = "Build skills for today, tomorrow, and beyond.";
  const description2 = "Education to future-proof your career.";
  const type="signup";

  return (
    <div>   
        <Template
            heading={heading}
            description1={description1}
            description2={description2}
            type={type}
            img={signupImage}
            frame={frame}
        />
    </div>
  )
}

export default Signup