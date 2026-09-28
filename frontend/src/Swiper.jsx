import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Pagination,FreeMode } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/free-mode";
function SwiperPractice() {
     const courses = [
    "React",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "Express",
  ];

  const showPagination=courses.length>4;
  return (
    <div className="w-full text-center  mx-10 my-10">
      <Swiper 
      slidesPerView={2}
      spaceBetween={20}
      loop={courses.length > 3}
      breakpoints={{
        640:{
            slidesPerView:2
        },
        1024:{
            slidesPerView:3
        }

      }}
      allowTouchMove={true}
      grabCursor={true}
      modules={[Pagination,FreeMode]}
      pagination={showPagination?{clickable:true}:false}
      freeMode={true}
      >
        {
            courses.map((course)=>{
                return <SwiperSlide>

                    <div className="rounded-lg bg-richblack-700 p-10 text-center text-white">
                        {course}
                    </div>

                </SwiperSlide>
            })
        }
      </Swiper>
    </div>
  );
}

export default SwiperPractice;