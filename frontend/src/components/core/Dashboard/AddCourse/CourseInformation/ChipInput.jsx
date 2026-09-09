import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const ChipInput = ({ label, name, register, setValue, placeholder, errors, }) => {
  const [chips, setChips] = useState([]);
  const {course,editCourse}=useSelector(state=>state.course);

  function KeyDownHandler(event) {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();

      const value = event.target.value.trim();

      if (value && !chips.includes(value)) {
        const newChips = [...chips, value];

        setChips(newChips);
      }

      event.target.value = "";
    }
  }

  function removeChips(chip) {
    if (chips.includes(chip)) {
      const remove = chips.filter((item) => item !== chip);

      setChips(remove);
    }
  }

  // {courseTitle: 'new course', courseShortDesc: 'very very good girl kepp it up', coursePrice: 56, courseCategory: '69c59b73145188072629de4c', courseBenefi

  useEffect(() => {

    if(editCourse){
      setChips(course.tag);
    }

    register(name, { 
      required: { value: true, message: "Tags are required", }, 
      validate: (value) => value.length > 0 || "Tags are required", });

    
    }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips, name, setValue]);

  return (
    <div className="flex flex-col space-y-2">

      <label
        htmlFor={name}
        className="text-sm text-richblack-5"
      >
        {label}{" "}
        <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">

        {chips.map((chip, index) => (
          <div
            className="m-1 flex items-center rounded-full bg-yellow-50 px-2 py-1 text-sm text-richblack-900"
            key={index}
          >
            <span>{chip}</span>

            <MdClose
              onClick={() => removeChips(chip)}
              className="ml-2 cursor-pointer text-sm"
            />
          </div>
        ))}

        <input
          id={name}
          placeholder={placeholder}
          onKeyDown={KeyDownHandler}
          className="form-style w-full"
        />
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default ChipInput;