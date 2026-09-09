import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const ChipInput = ({ label, name, register, setValue, setValues, placeholder, errors, }) => {
  const [chips, setChips] = useState([]);

  function KeyDownHandler(event) {
    console.log("event dekhna hai", event);

    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();

      if (!chips.includes(event.target.value)) {
        let add = event.target.value;

        setChips([...chips, add.trim()]);
      }

      event.target.value = "";
    }
  }

  function removeChips(chip) {
    console.log("remove wala", chip);

    if (chips.includes(chip)) {
      let remove = chips.filter((item) => item !== chip);

      setChips(remove);
    }
  }

  return (
    <div className="flex flex-col space-y-2">

      <label htmlFor="tags" className="text-sm text-richblack-5" >
        {label}{" "}
        <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-900"
            key={index}
          >
            <span>{chip}</span>

            <MdClose
              onClick={() => removeChips(chip)}
              className="ml-2 cursor-pointer text-sm"
            />
          </div>
        ))}
      </div>

      <input
        id="tags"
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: true,
            message: "tags are required",
          },
        })}
        onKeyDown={KeyDownHandler}
        className="form-style w-full"
      />

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default ChipInput;