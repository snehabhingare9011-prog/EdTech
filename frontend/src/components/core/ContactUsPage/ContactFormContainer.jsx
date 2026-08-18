import React from "react";
import ContactUsForm from "../../common/ContactUsForm";

const ContactFormContainer = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-900 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-richblack-600 sm:p-8 lg:p-10">

      {/* Top gradient line */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-50 to-transparent opacity-70" />

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-50/10 blur-[90px] transition-all duration-700 group-hover:bg-yellow-50/15" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-purple-500/5 blur-[90px]" />


      {/* Heading */}
      <div className="relative z-10">

        <div className="mb-5 flex items-center gap-3">

          <span className="h-[2px] w-8 rounded-full bg-yellow-50" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-50">
            Contact Form
          </span>

        </div>


        <h1 className="max-w-[650px] text-3xl font-semibold leading-tight text-richblack-5 sm:text-4xl lg:text-[42px]">

          Got a Idea?{" "}

          <span className="bg-gradient-to-r from-yellow-50 via-orange-300 to-yellow-50 bg-clip-text text-transparent">
            We&apos;ve got the skills.
          </span>{" "}

          Let&apos;s team up

        </h1>


        <p className="mt-4 max-w-[600px] text-sm leading-6 text-richblack-300 sm:text-base">
          Tell us more about yourself and what you&apos;re got in mind.
        </p>

      </div>


      {/* Divider */}
      <div className="relative z-10 my-8 flex items-center gap-3">

        <div className="h-px flex-1 bg-richblack-700" />

        <div className="h-1.5 w-1.5 rounded-full bg-yellow-50 shadow-[0_0_10px_rgba(255,214,10,0.7)]" />

        <div className="h-px flex-1 bg-richblack-700" />

      </div>


      {/* Form */}
      <div className="relative z-10">
        <ContactUsForm />
      </div>


      {/* Bottom decoration */}
      <div className="pointer-events-none absolute bottom-4 right-5 flex gap-1 opacity-30">

        <span className="h-1 w-1 rounded-full bg-yellow-50" />
        <span className="h-1 w-1 rounded-full bg-yellow-50" />
        <span className="h-1 w-1 rounded-full bg-yellow-50" />

      </div>

    </div>
  );
};

export default ContactFormContainer;