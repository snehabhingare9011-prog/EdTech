import { TypeAnimation } from "react-type-animation";
import CTAButton from "../../common/Button"
import HighlightText from "../../common/HighlightText"
import { FaArrowRight } from "react-icons/fa";

const CodeSection = ({ heading, description, ctabtn1, ctabtn2, reverse, ellipseColor, codeColor="white", codeBlock}) => {
    const colorMap = {
        // 🌕 Warm colors
        yellow: "bg-[#FABF52]",
        orange: "bg-orange-500",
        amber: "bg-amber-400",
        peach: "bg-[#FFCBA4]",

        // 🔥 Reds / Pinks
        red: "bg-red-500",
        rose: "bg-rose-400",
        pink: "bg-pink-500",
        hotpink: "bg-[#FF4D6D]",

        // 🌊 Blues
        blue: "bg-blue-300",
        sky: "bg-sky-400",
        cyan: "bg-cyan-400",
        navy: "bg-[#1E3A8A]",

        // 🌿 Greens
        green: "bg-green-500",
        lime: "bg-lime-400",
        emerald: "bg-emerald-400",
        teal: "bg-teal-400",

        // 🟣 Purples
        purple: "bg-purple-500",
        violet: "bg-violet-500",
        indigo: "bg-indigo-500",
        lavender: "bg-[#C084FC]",

        // ⚫ Neutrals
        white: "bg-white",
        gray: "bg-gray-400",
        dark: "bg-gray-800",
        black: "bg-black",

        // 🌈 Gradients (VERY COOL for UI)
        gradientSun: "bg-gradient-to-r from-yellow-400 to-orange-500",
        gradientOcean: "bg-gradient-to-r from-blue-400 to-cyan-400",
        gradientPurple: "bg-gradient-to-r from-purple-500 to-pink-500",
        gradientGreen: "bg-gradient-to-r from-green-400 to-emerald-500",
        gradientFire: "bg-gradient-to-r from-red-500 to-yellow-500",
    };

    return (
        <div className={`font-inter my-5 lg:my-15 text-white flex flex-col gap-8 lg:gap-1 md:w-[90%] md:flex-row  justify-around ${reverse ? "md:flex-row-reverse" : ""} items-center`}>
            {/* Text Section */}
            <div className="md:w-[45%] flex flex-col justify-around gap-5">
                <div className="flex flex-col gap-4">
                    <h3 className="text-3xl lg:text-4xl font-semibold flex flex-wrap gap-2">
                        {
                            heading.map((item, index) => {
                                return <span key={index}>
                                    {item.highlight ? (
                                        <HighlightText>{item.text}</HighlightText>
                                    ) : (
                                        item.text
                                    )}
                                </span>
                            })
                        }
                    </h3>
                    <p className="text-richblack-300">{description}</p>
                </div>

                {/* CTAButtons */}
                <div className="flex gap-3">
                    <CTAButton  linkTo={ctabtn1.linkTo} active={ctabtn1.active} >
                       <div className="flex items-center gap-2">
                            <span>{ctabtn1.text}</span>
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                 
                    <CTAButton  linkTo={ctabtn2.linkTo}  active={ctabtn2.active} >
                        {ctabtn2.text}
                    </CTAButton>

                </div>
            </div>
            {/* Code block */}
            <div className="relative min-w-full md:min-w-[47%] code-border py-5 font-semibold">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-linear-to-r from-[#0E1A2D3D] to-[#111E3261]`}></div>

                {/* overloay for code block */}
                <div className='absolute blur-2xl -top-7 -left-7'>
                    <div className={`w-90 h-50 opacity-50 rounded-full mx-auto ${colorMap[ellipseColor] || "bg-yellow-400"}`}></div>
                </div>

                {/* Blur overlay */}
                <div className="absolute inset-0 backdrop-blur-2xl bg-white/1"></div>

                {/* Content */}
                <div className="relative gap-2 text-xs md:text-sm w-full flex">
                    <div className="w-[8%] flex flex-col items-center text-richblack-400">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                    <TypeAnimation omitDeletionAnimation={true}
                        style={{ whiteSpace: 'pre-line', display: 'block', color: `${codeColor}`, position: 'relative' }}
                        sequence={[
                            `${codeBlock}`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
                            1000,
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeSection