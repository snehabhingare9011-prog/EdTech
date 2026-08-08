import React, { useState } from "react";
import HighlightText from "../HighlightText";
import CategoryTabs from "./CategoryTabs";
import { HomePageExplore } from "../../../../data/homepage-explore";
import CourseGrid from "./CourseGrid";

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);

  const selectedCategory = HomePageExplore.find(
    (category) => category.tag === currentTab
  );

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
      <CategoryTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Courses */}
      { selectedCategory && (
        <CourseGrid courses={selectedCategory.courses} />
      )}

    </section>
  );
};

export default ExploreMore;