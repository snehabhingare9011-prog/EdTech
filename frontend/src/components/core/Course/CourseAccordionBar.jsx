import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

export default function CourseAccordionBar({
  section,
  isActive,
  handleActive,
}) {
  // Reference to the lecture container
  const contentRef = useRef(null);

  // Whether this section is currently open
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  useEffect(() => {
    setIsSectionOpen(isActive?.includes(section._id));
  }, [isActive, section._id]);

  // Height of the lecture content
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setContentHeight(
      isSectionOpen ? contentRef.current.scrollHeight : 0
    );
  }, [isSectionOpen]);

  return (
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      
      {/* Section Header */}
      <div
        className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]"
        onClick={() => { handleActive(section._id); }}
      >
        <div className="flex items-center gap-2">
          <i
            className={
              isActive.includes(section._id)
                ? "rotate-180"
                : "rotate-0"
            }
          >
            <AiOutlineDown />
          </i>

          <p>{section?.sectionName}</p>
        </div>

        <div className="space-x-4">
          <span className="text-yellow-25">
            {`${section?.subSection?.length || 0} lecture(s)`}
          </span>
        </div>
      </div>

      {/* Lecture Content */}
      <div
        ref={contentRef}
        className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]"
        style={{ height: contentHeight, }}
      >
        <div className="flex flex-col gap-2 px-7 py-6 font-semibold text-textHead">
          {section?.subSection?.map((subSection, index) => (
            <CourseSubSectionAccordion
              subSection={subSection}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}