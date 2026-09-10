import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformation";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);

    console.log("step inside the renderSteps", step);

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ];

    return (
        <>
              <div className="text-richblack-5  w-[87%] mx-auto">

                {/* Step circles + lines */}
                <div className="relative mb-2 flex w-full">

                    {steps.map((item) => (
                        <div
                            key={item.id}
                            className={`flex ${
                                item.id !== steps.length ? "flex-1" : ""
                            }`}
                        >

                            {/* Circle */}
                            <div
                                className={`grid aspect-square w-8 place-items-center rounded-full border ${
                                    step === item.id
                                        ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                                        : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                } ${
                                    step > item.id
                                        ? "bg-yellow-50 text-richblack-900"
                                        : ""
                                }`}
                            >
                                {step > item.id ? (
                                    <FaCheck className="text-sm font-bold" />
                                ) : (
                                    item.id
                                )}
                            </div>

                            {/* Line */}
                            {item.id !== steps.length && (
                                <div
                                    className={`flex-1 self-center border-b-2 border-dashed ${
                                        step > item.id
                                            ? "border-yellow-50"
                                            : "border-richblack-500"
                                    }`}
                                />
                            )}

                        </div>
                    ))}

                </div>

                {/* Step titles */}
                <div className="grid w-full grid-cols-3">
                    {steps.map((item) => (
                        <div key={item.id}>
                            <p
                                className={`text-sm ${
                                    step >= item.id
                                        ? "text-richblack-5"
                                        : "text-richblack-500"
                                } ${
                                    item.id === 1
                                        ? "text-left"
                                        : item.id === 2
                                        ? "text-center"
                                        : "text-right"
                                }`}
                            >
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Step Content */}
            <div className="w-full">
                {step === 1 && <div className="w-[87%] mx-auto mt-3 mb-6"> <CourseInformationForm /> </div>}
                {step === 2 && <CourseBuilderForm />}
                {/* {step === 3 && <PublishForm />} */}
            </div>
        </>
    );
};

export default RenderSteps;