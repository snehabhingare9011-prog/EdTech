import React from "react";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi2";
import * as IoIcons from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy Nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetailsCard = () => {
  return (
    <div className="group/card relative h-full overflow-hidden rounded-[24px] border border-richblack-700 bg-richblack-900 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-6">

      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-yellow-50/10 blur-[90px] transition-all duration-700 group-hover/card:bg-yellow-50/20" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-10 top-8 h-2 w-2 animate-pulse rounded-full bg-yellow-50 shadow-[0_0_15px_rgba(255,214,10,0.8)]" />
      <div className="pointer-events-none absolute bottom-20 left-8 h-1.5 w-1.5 animate-ping rounded-full bg-blue-400" />

      <div className="relative z-10 mb-7 px-2">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative h-[2px] w-10 overflow-hidden rounded-full bg-richblack-700">
            <div className="absolute left-0 top-0 h-full w-1/2 animate-[slide_2s_ease-in-out_infinite] bg-yellow-50" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-50">
            Contact
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-richblack-5">
          We&apos;re here
          <span className="bg-gradient-to-r from-yellow-50 to-orange-400 bg-clip-text text-transparent">
            {" "}for you
          </span>
        </h2>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="absolute bottom-10 left-[39px] top-10 hidden w-px bg-gradient-to-b from-yellow-50/60 via-richblack-600 to-transparent sm:block" />

        {contactDetails.map((detail, index) => {
          const Icon =
            BiIcons[detail.icon] ||
            HiIcons[detail.icon] ||
            IoIcons[detail.icon];

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-transparent p-4 transition-all duration-500 hover:-translate-y-1 hover:border-richblack-600 hover:bg-richblack-800"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-yellow-50/10 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />

              <div className="absolute left-0 top-0 h-[1px] w-0 bg-gradient-to-r from-yellow-50 to-transparent transition-all duration-500 group-hover:w-full" />

              <div className="relative flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-yellow-50/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-richblack-600 bg-richblack-700 text-yellow-50 transition-all duration-500 group-hover:scale-110 group-hover:border-yellow-50/40 group-hover:bg-yellow-50 group-hover:text-richblack-900 group-hover:shadow-[0_0_30px_rgba(255,214,10,0.25)]">
                    <Icon
                      size={23}
                      className="transition-transform duration-500 group-hover:rotate-[12deg]"
                    />
                  </div>

                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-richblack-600 bg-richblack-900 text-[8px] font-bold text-richblack-300 transition-all duration-300 group-hover:border-yellow-50 group-hover:text-yellow-50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-richblack-5 transition-colors duration-300 group-hover:text-yellow-50">
                      {detail.heading}
                    </h3>

                    <span className="translate-x-[-5px] text-lg text-yellow-50 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      ↗
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-5 text-richblack-300">
                    {detail.description}
                  </p>

                  <p className="mt-2 break-words text-sm font-medium leading-5 text-richblack-100">
                    {detail.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-6 overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800/70 p-4">
        <div className="absolute inset-y-0 -left-20 w-20 bg-gradient-to-r from-transparent via-yellow-50/10 to-transparent blur-sm transition-transform duration-1000 group-hover/card:translate-x-[400px]" />

        <div className="relative flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-50 opacity-50" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-50 shadow-[0_0_12px_rgba(255,214,10,0.8)]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-richblack-100">
              Available to help
            </p>

            <p className="mt-0.5 text-[10px] text-richblack-400">
              We&apos;re ready when you are
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(-30px); }
            50% { transform: translateX(40px); }
            100% { transform: translateX(-30px); }
          }
        `}
      </style>
    </div>
  );
};

export default ContactDetailsCard;