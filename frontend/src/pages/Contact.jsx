import React from "react";
import ContactDetailsCard from "../components/core/ContactUsPage/ContactDetailsCard";
import ContactFormContainer from "../components/core/ContactUsPage/ContactFormContainer";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Contact = () => {
  return (
    <div className="w-full bg-richblack-900">

      {/* Section 1: Contact Section */}
      <section className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-yellow-50/5 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="relative z-10 mx-auto flex w-11/12 max-w-maxContent flex-col gap-10 py-20 text-white lg:flex-row lg:items-start">

          {/* Contact Details */}
          <div className="w-full lg:w-[38%]">
            <ContactDetailsCard />
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-[62%]">
            <ContactFormContainer />
          </div>

        </div>

      </section>

      {/* Section 2: Reviews & Ratings */}
      <section className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="relative z-10 mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-3 py-16 text-white">

          <h1 className="text-center text-3xl font-semibold text-richblack-5 md:text-4xl">
            Reviews from other learners
          </h1>

          <p className="max-w-2xl text-center text-sm leading-6 text-richblack-300 md:text-base">
            See what our learners have to say about their learning experience.
          </p>

          <div className="mt-6 w-full">
            <ReviewSlider />
          </div>

        </div>

      </section>

      {/* Section 3: Footer */}
      <Footer />

    </div>
  );
};

export default Contact;