import React, { useState } from "react";
import HighlightText from "../../../common/HighlightText"

import { HomePageExplore } from "../../../../data/homepage-explore";
import CourseGrid from "./CourseGrid";

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(
    HomePageExplore[0].tag
  );

  const [currentCard, setCurrentCard] = useState(0);

  const selectedCategory = HomePageExplore.find(
    (category) => category.tag === currentTab
  );

  const handleTabChange = (tag) => {
    setCurrentTab(tag);
    setCurrentCard(0);
  };

  return (
    <section className="w-full py-16">

      {/* ================= HEADING ================= */}
      <div className="flex flex-col items-center gap-2 text-center">

        <h2 className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
          Unlock the{" "}
          <HighlightText>
            Power of Code
          </HighlightText>
        </h2>

        <p className="text-sm font-semibold text-richblack-300 md:text-base">
          Learn to Build Anything You Can Imagine
        </p>

      </div>


      {/* ================= CATEGORY TABS ================= */}
      <div
        className="
          mx-auto
          mt-8
          flex
          w-fit
          max-w-[95%]
          flex-wrap
          justify-center
          gap-1
          rounded-full
          bg-richblack-800
          p-1
        "
      >

        {HomePageExplore.map((category) => (

          <button
            key={category.tag}
            onClick={() => handleTabChange(category.tag)}
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              md:px-6
              md:py-3
              ${
                currentTab === category.tag
                  ? `
                    bg-richblack-900
                    text-white
                    shadow-sm
                  `
                  : `
                    text-richblack-300
                    hover:bg-richblack-700
                    hover:text-white
                  `
              }
            `}
          >
            {category.tag}
          </button>

        ))}

      </div>


      {/* ================= COURSE CARDS ================= */}
      {selectedCategory && (
        <CourseGrid
          courses={selectedCategory.courses}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      )}

    </section>
  );
};

export default ExploreMore;