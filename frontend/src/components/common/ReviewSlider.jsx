import React, { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

import RatingStars from "./RatingStars";


const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const result = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API,
        null
      );

      console.log("result inside the rating and review", result);

      if (result?.data?.success) {
        setReviews(result.data.data);
      }
    })();
  }, []);

  // Duplicate reviews for continuous loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="w-full overflow-hidden text-white">
      <div className="mx-auto my-[50px] w-full max-w-maxContentTab lg:max-w-maxContent">

        {/* Continuous Moving Track */}
        <div className="review-marquee">
          <div className="review-track">

            {duplicatedReviews.map((review, index) => {
              return (
                <div key={`${review._id}-${index}`} className="review-card"
                >

                  {/* User */}
                  <div className="flex items-center gap-4">

                    {/* User Image */}
                    <img
                      src={
                        review?.user?.image
                          ? review.user.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />

                    {/* User Details */}
                    <div className="min-w-0">

                      <h1 className="truncate">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>

                      <p className="course-name mt-1 truncate">
                        {review?.course?.courseName}
                      </p>

                    </div>
                  </div>

                  {/* Review */}
                  <div className="mt-5">

                    <p className="review-text">
                      {review?.review?.split(" ").length > truncateWords
                        ? `${review?.review
                            ?.split(" ")
                            .slice(0, truncateWords)
                            .join(" ")} ...`
                        : review?.review}
                    </p>

                  </div>

                  {/* Rating */}
                  <div className="rating-section">

                    {/* Left */}
                    <div className="rating-number">
                        <span className="rating">
                        {review?.rating?.toFixed(1)}
                        </span>

                        <span className="out-of">
                        / 5
                        </span>
                    </div>

                    {/* Right */}
                    <RatingStars
                        Review_Count={review?.rating}
                        Star_Size={20}
                    />

                    </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewSlider;