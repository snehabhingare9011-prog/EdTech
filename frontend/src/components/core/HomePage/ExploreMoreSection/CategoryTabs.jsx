import React from "react";
import { HomePageExplore } from "../../../../data/homepage-explore";

const CategoryTabs = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-2 rounded-full bg-richblack-800 p-1">

      {HomePageExplore.map((category) => (
        <button
          key={category.tag}
          onClick={() => setCurrentTab(category.tag)}
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
  );
};

export default CategoryTabs;