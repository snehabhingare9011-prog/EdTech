import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";
import IconBtn from "./IconBtn";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";

const VideoDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId, sectionId, subSectionId } = useParams();

  const { courseEntireData, completedLectures, courseSectionData } =
    useSelector((state) => state.viewCourse);

  const { token } = useSelector((state) => state.auth);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const playerRef = useRef(null);
  const location = useLocation();

  // Get current video data
  useEffect(() => {
    console.log("inde the useEffect of videoooooooooooooooooooooooooooooooo")
    if (!courseSectionData?.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`);
      return;
    }

    const filteredData = courseSectionData.filter(
      (section) => section?._id === sectionId
    );

    const filteredVideoData = filteredData?.[0]?.subSection?.filter(
      (subSection) => subSection?._id === subSectionId
    );

    setVideoData(filteredVideoData?.[0] || null);

    setPreviewSource(courseEntireData?.thumbnail || "");

    setVideoEnded(false);
  }, [ courseId, sectionId, subSectionId, courseSectionData, courseEntireData, location.pathname, navigate, ]);

  // Check if current video is first video
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    if (currentSectionIndx === -1 || currentSectionIndx === undefined) {
      return false;
    }

    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection?.findIndex(
        (subSection) => subSection?._id === subSectionId
      );

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true;
    }

    return false;
  };

  // Go to next video
  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    if (currentSectionIndx === -1 || currentSectionIndx === undefined) {
      return;
    }

    const noOfSubsections =
      courseSectionData?.[currentSectionIndx]?.subSection?.length || 0;

    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection?.findIndex(
        (subSection) => subSection?._id === subSectionId
      );

    if (currentSubSectionIndx === -1) return;

    // Next video in same section
    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx + 1
        ]?._id;

      if (!nextSubSectionId) return;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // First video of next section
      const nextSectionId =
        courseSectionData?.[currentSectionIndx + 1]?._id;

      const nextSubSectionId =
        courseSectionData?.[currentSectionIndx + 1]?.subSection?.[0]?._id;

      if (!nextSectionId || !nextSubSectionId) return;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  // Check if current video is last video
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    if (currentSectionIndx === -1 || currentSectionIndx === undefined) {
      return false;
    }

    const noOfSubsections =
      courseSectionData?.[currentSectionIndx]?.subSection?.length || 0;

    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection?.findIndex(
        (data) => data?._id === subSectionId
      );

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true;
    }

    return false;
  };

  // Go to previous video
  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    if (currentSectionIndx === -1 || currentSectionIndx === undefined) {
      return;
    }

    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection?.findIndex(
        (subSection) => subSection?._id === subSectionId
      );

    if (currentSubSectionIndx === -1) return;

    // Previous video in same section
    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx - 1
        ]?._id;

      if (!prevSubSectionId) return;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // Last video of previous section
      const prevSectionId =
        courseSectionData?.[currentSectionIndx - 1]?._id;

      const prevSubSectionLength =
        courseSectionData?.[currentSectionIndx - 1]?.subSection?.length || 0;

      const prevSubSectionId =
        courseSectionData?.[currentSectionIndx - 1]?.subSection?.[
          prevSubSectionLength - 1
        ]?._id;

      if (!prevSectionId || !prevSubSectionId) return;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // Mark lecture as completed
  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subSectionId: subSectionId,
      },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 text-white">
        {!videoData ? (
          previewSource ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-md bg-richblack-800 text-richblack-300">
              Loading preview...
            </div>
          )
        ) : (
          <div className="relative w-full">
            <video
              ref={playerRef}
              className="aspect-video w-full rounded-lg"
              src={videoData?.videoUrl}
              controls
              playsInline
               autoPlay
              onEnded={() => setVideoEnded(true)}
              poster={previewSource}
            >
              Your browser does not support the video tag.
            </video>

            {videoEnded && (
              <div
                className="absolute inset-0 z-10 grid place-content-center"
                style={{
                  background:
                    "linear-gradient(to top, black, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
                }}
              >
                {!completedLectures?.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                  />
                )}

                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      playerRef.current.currentTime = 0;
                      playerRef.current.play();
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />

                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="blackButton"
                    >
                      Prev
                    </button>
                  )}

                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="blackButton"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <h1 className="mt-4 text-3xl font-semibold">
          {videoData?.title}
        </h1>

        <p className="pb-6 pt-2">
          {videoData?.description}
        </p>
      </div>
    </div>
  );
};

export default VideoDetails;