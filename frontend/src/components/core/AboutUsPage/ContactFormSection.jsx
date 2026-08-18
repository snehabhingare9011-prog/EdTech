import React from "react";
import ContactUsForm from "../../common/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="w-full px-4  text-white sm:px-8 lg:px-12">

      {/* Heading Section */}
      <div className="mx-auto max-w-[900px] text-center">

        {/* Small Label */}
        <p className="contact-label mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-50">
          Contact Us
        </p>


        {/* Main Heading */}
        <h1 className="contact-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-5xl">
          Get In{" "}

          <span className="relative inline-block">

            <span className="bg-gradient-to-r from-yellow-50 via-orange-400 to-yellow-50 bg-[length:200%_auto] bg-clip-text text-transparent">
              Touch
            </span>

          </span>
        </h1>


        {/* Message */}
        <p className="contact-message mx-auto mt-6 max-w-[650px] text-base leading-7 text-richblack-300 sm:text-lg">
          We&apos;d love to hear from you. Please fill out the form below
          and we&apos;ll get back to you soon.
        </p>


        {/* Animated Divider */}
        <div className="contact-line relative mx-auto mt-7 h-[2px] w-24 overflow-hidden rounded-full bg-richblack-700">

          <div className="absolute left-0 top-0 h-full w-8 rounded-full bg-yellow-50 contact-dot" />

        </div>

      </div>


      {/* Form */}
      <div className="contact-form mx-auto mt-14 w-full max-w-[850px]">
        <ContactUsForm />
      </div>


      {/* Animations */}
      <style>
        {`

          /* Small label comes down */
          .contact-label {
            opacity: 0;
            transform: translateY(-12px);
            animation: labelEnter 0.7s ease-out forwards;
          }

          /* Heading comes upward */
          .contact-heading {
            opacity: 0;
            transform: translateY(25px);
            animation: headingEnter 0.8s ease-out 0.15s forwards;
          }

          /* Message comes from slightly lower */
          .contact-message {
            opacity: 0;
            transform: translateY(18px);
            animation: messageEnter 0.8s ease-out 0.35s forwards;
          }

          /* Form appears after heading */
          .contact-form {
            opacity: 0;
            transform: translateY(25px);
            animation: formEnter 0.9s ease-out 0.5s forwards;
          }

          /* Yellow line grows */
          .contact-line {
            transform: scaleX(0);
            animation: lineGrow 0.7s ease-out 0.7s forwards;
          }

          /* Small light travels across line */
          .contact-dot {
            animation: dotMove 2s ease-in-out 1.4s infinite;
          }


          @keyframes labelEnter {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes headingEnter {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes messageEnter {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes formEnter {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes lineGrow {
            to {
              transform: scaleX(1);
            }
          }

          @keyframes dotMove {
            0% {
              transform: translateX(-35px);
            }

            50% {
              transform: translateX(95px);
            }

            100% {
              transform: translateX(-35px);
            }
          }

          /* Respect users who prefer reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .contact-label,
            .contact-heading,
            .contact-message,
            .contact-form,
            .contact-line {
              animation: none;
              opacity: 1;
              transform: none;
            }

            .contact-dot {
              animation: none;
            }
          }

        `}
      </style>

    </div>
  );
};

export default ContactFormSection;