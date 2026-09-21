import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Swiper modules
import { FreeMode, Pagination } from "swiper/modules";

import CourseCard from "./CourseCard";

function CourseSlider({ Courses }) {
  const showPagination = Courses?.length > 3;

  return (
    <>
      {Courses?.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={Courses.length > 3}
          allowTouchMove={true}
          grabCursor={true}
          modules={[FreeMode, Pagination]}
          freeMode={true}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="course-swiper w-full"
        >
          {Courses.map((course) => (
            <SwiperSlide key={course._id}>
              <CourseCard
                course={course}
                Height="h-[250px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-900 px-6 py-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-richblack-700">
              <span className="text-2xl">📚</span>
            </div>

            <p className="text-lg font-semibold text-richblack-50">
              No Courses Available
            </p>

            <p className="mt-2 max-w-md text-sm text-richblack-100">
              There are currently no courses available in this category.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseSlider;