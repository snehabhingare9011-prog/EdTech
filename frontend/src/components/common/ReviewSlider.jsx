import React, { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";
import RatingStars from "./RatingStars";
import "./ReviewSlider.css";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const truncateWords = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API,
          null
        );

        if (result?.data?.success) {
          setReviews(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Close modal using the Escape key
  useEffect(() => {
    if (!selectedReview) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedReview(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedReview]);

  // Duplicate reviews for continuous scrolling
  const duplicatedReviews = [...reviews, ...reviews];

  // Generate an avatar when the user has no profile image
  const getUserImage = (review) => {
    if (review?.user?.image) return review.user.image;

    const name = `${review?.user?.firstName || ""} ${
      review?.user?.lastName || ""
    }`;

    return `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
      name.trim() || "Student"
    )}`;
  };

  return (
    <div className="w-full overflow-hidden text-white">
      <div className="mx-auto my-[50px] w-full max-w-maxContentTab lg:max-w-maxContent">
        <div className="review-marquee">
          <div className="review-track">
            {duplicatedReviews.map((review, index) => {
              const reviewText = (review?.review || "").trim();
              const reviewWords = reviewText.split(/\s+/).filter(Boolean);
              const hasMoreThanLimit = reviewWords.length > truncateWords;
              const previewText = hasMoreThanLimit
                ? `${reviewWords.slice(0, truncateWords).join(" ")}...`
                : reviewText || "No review provided.";

              return (
                <div
                  key={`${review._id || "review"}-${index}`}
                  className="review-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedReview(review)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedReview(review);
                    }
                  }}
                  aria-label={`Read review by ${
                    review?.user?.firstName || "student"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={getUserImage(review)}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <h1 className="truncate">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h1>
                      <p className="course-name mt-1 truncate">
                        {review?.course?.courseName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="review-text">{previewText}</p>
                   
                      <span className="read-more">Read full review →</span>
                    
                  </div>

                  <div className="rating-section">
                    <div className="rating-number">
                      <span className="rating">
                        {Number(review?.rating ?? 0).toFixed(1)}
                      </span>
                      <span className="out-of"> / 5</span>
                    </div>
                    <RatingStars Review_Count={review?.rating} Star_Size={20} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedReview && (
        <div
          className="review-modal-overlay"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="review-modal-close"
              onClick={() => setSelectedReview(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 id="review-modal-title" className="review-modal-title">
              Student Review
            </h2>

            <div className="review-modal-user">
              <img
                src={getUserImage(selectedReview)}
                alt=""
                className="review-modal-avatar"
              />
              <div className="review-modal-user-details">
                <h3>
                  {selectedReview?.user?.firstName}{" "}
                  {selectedReview?.user?.lastName}
                </h3>
                <p>{selectedReview?.course?.courseName}</p>
              </div>
            </div>

            <div className="review-modal-content">
              <p>{selectedReview?.review || "No review provided."}</p>
            </div>

            <div className="review-modal-rating">
              <span className="review-modal-rating-number">
                {Number(selectedReview?.rating ?? 0).toFixed(1)}
                <span> / 5</span>
              </span>
              <RatingStars
                Review_Count={selectedReview?.rating}
                Star_Size={24}
              />
            </div>

            <button
              type="button"
              className="review-modal-done"
              onClick={() => setSelectedReview(null)}
            >
              Close Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSlider;
