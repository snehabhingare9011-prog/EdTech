import React, { useEffect, useState } from "react";
import HighlightText from "../HighlightText";

import { HomePageExplore } from "../../../../data/homepage-explore";
import CourseGrid from "./CourseGrid";

const ExploreMore = () => {
  console.log("exploreMore");
  
  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
  const [currentCard,setCurrentCard] = useState(0);


  const selectedCategory = HomePageExplore.find(
    (category) => category.tag === currentTab
  );

  const handleTabChange = (tag) => {
      setCurrentTab(tag);
      setCurrentCard(0);
  };

  return (
    <section className="w-full py-20">

      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-white">
          Unlock the{" "}
          <HighlightText
            text="Power of Code"
            textColor="text-caribbeangreen-25"
          />
        </h2>

        <p className="mt-3 text-[15px] font-medium text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* Category Tabs */}
     
      <div className="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-2 rounded-full bg-richblack-800 p-1">

        {HomePageExplore.map((category) => (
          <button
            key={category.tag}
            onClick={() => {

               handleTabChange(category.tag)

            }}
            className={`
              rounded-full px-5 py-2 text-sm font-medium
              transition-all duration-200
              ${
                currentTab === category.tag
                  ? "bg-richblack-900 text-caribbeangreen-25 shadow-sm"
                  : "text-richblack-200 hover:bg-richblack-700 hover:text-white"
              }
            `}
          >
            {category.tag}
          </button>
        ))}

      </div>

      {/* Courses */}
      { selectedCategory && (
        <CourseGrid courses={selectedCategory.courses} currentCard={currentCard} setCurrentCard={setCurrentCard} />
      )}

    </section>
  );
};

export default ExploreMore;