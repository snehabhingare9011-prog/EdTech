import React from "react";
import ContactDetailsCard from "../components/core/ContactUsPage/ContactDetailsCard";
import ContactFormContainer from "../components/core/ContactUsPage/ContactFormContainer";
import Footer from "../components/common/Footer";

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

      {/* Section 2: TODO - Reviews & Ratings Section */}

      {/* Section 3: Footer */}
      <Footer />

    </div>
  );
};

export default Contact;