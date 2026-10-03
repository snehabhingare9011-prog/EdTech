import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "./IconBtn"


export default function VideoDetailsSidebar({ setReviewModal }) {
  console.log("inside the video details")
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { sectionId, subSectionId } = useParams();

  const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures, } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    console.log("inside the useEffect");
    if (!courseSectionData?.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section?._id === sectionId
    );

    if (currentSectionIndex === -1) return;

    const currentSection = courseSectionData[currentSectionIndex];

    const currentSubSectionIndex = currentSection?.subSection?.findIndex( (subSection) => subSection?._id === subSectionId );

    const activeSubSectionId = currentSection?.subSection?.[ currentSubSectionIndex ]?._id;

    setActiveStatus(currentSection?._id || "");

    setVideoBarActive(activeSubSectionId || "");


  }, [ courseSectionData, courseEntireData, location.pathname, ]);

  const handleSectionClick = (sectionId) => {
    setActiveStatus((prev) =>
      prev === sectionId ? "" : sectionId
    );
  };

  return (
    <div className="flex h-[calc(100vh-66px)] w-[320px] max-w-[350px] flex-col border-r border-r-richblack-700 bg-richblack-800">

      {/* Header */}
      <div className="mx-5 flex flex-col gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">

        <div className="flex w-full items-center justify-between">
          <div
            onClick={() =>
              navigate("/dashboard/enrolled-courses")
            }
            className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>

          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div className="flex flex-col">
          <p>{courseEntireData?.courseName}</p>

          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures?.length || 0} /{" "}
            {totalNoOfLectures || 0}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto hide-scrollbar">

        {courseSectionData?.map((section, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            key={section?._id || index}
          >

            {/* Section */}
            <div onClick={() => handleSectionClick(section?._id) } className="flex flex-row justify-between bg-richblack-600 px-5 py-4" >
              <div className="w-[70%] font-semibold">
                {section?.sectionName}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`${
                    activeStatus === section?._id
                      ? "rotate-0"
                      : "rotate-180"
                  } transition-all duration-500`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === section?._id && (
              <div>
                {section?.subSection?.map(
                  (subSection, i) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${
                        videoBarActive === subSection?._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      }`}
                      key={subSection?._id || i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                        );

                        setVideoBarActive(
                          subSection?._id
                        );
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={
                          completedLectures?.includes(
                            subSection?._id
                          ) || false
                        }
                        onChange={() => {}}
                      />

                      {subSection?.title}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}