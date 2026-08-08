import React from 'react'

const Card = ({item,index}) => {
  console.log("item",item)
  return (
    <div
      className={`relative w-[300px] h-[220px]
        ${
          index === 0
            ? "bg-white text-black"
            : "bg-richblack-800 text-white"
        }
        border border-richblack-700
        shadow-[6px_6px_0px_#FFD60A]
      `}
    >

      {/* Content */}
      <div className="p-5">

        {/* Heading */}
        <h3 className="text-xl font-semibold mb-3">
          {item.heading}
        </h3>

        {/* Description */}
        <p className="text-sm text-richblack-600 leading-5">
          {item.description}
        </p>

      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full border border-dashed border-richblack-300 px-5 py-4 flex justify-between">

        <div className="text-sm text-richblack-200">
          👨‍💻 {item.level}
        </div>

        <div className="text-sm text-richblack-200">
          📚 {item.lessionNumber} Lessons
        </div>

      </div>

    </div>
  )
}

export default Card