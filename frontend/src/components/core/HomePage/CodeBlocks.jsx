import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from './HighlightText';
import CTAButton from "./Button";
 import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor="red"
}) => {
    console.log("insid the code block") 
  return (
    // <div className={`flex ${position} my-20  justify-between gap-10 `}> 
    <div className={`flex ${position}
  items-center
  justify-between
  gap-16
  w-11/12
  max-w-maxContent
  mx-auto`} > 
        
    {/* Section 1 */}
        {/* <div className='w-[50%] flex flex-col gap-8'>
         */}
         
         <div className="w-full lg:w-[48%] flex flex-col gap-6">
            <div className="text-4xl font-semibold leading-[1.2]">
    {heading}
</div>
            {/* {heading} */}
            {/* <div className='text-richblack-300 font-bold '>
                {subheading}
            </div> */}
            <p className="text-richblack-300 text-[16px] leading-7">
    {subheading}
</p>
            {/* <div className='flex gap-7 mt-7'>
             */}<div  className="flex gap-5 mt-4">
                <CTAButton active={ctabtn1.active} lintto={ctabtn1.linkto}>
                    <div className="flex items-center gap-2">
                        <span>{ctabtn1.btnText}</span>
                        <FaArrowRight />
                    </div>     
                </CTAButton>

                <CTAButton active={ctabtn2.active} lintto={ctabtn2.linkto}>
                    
                    {ctabtn2.btnText}
     
                </CTAButton>

            </div>

        </div>
    {/* Section 2 */}
    
    <div className="flex w-full h-full font-mono text-sm">

    {/* Line Numbers */}

    <div className="text-richblack-400 px-3 py-4 text-center select-none">
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

    {/* Code */}

    <div className="w-full flex flex-col py-4 pr-3">

        <TypeAnimation
            sequence={[
`<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1><a href="/">Header</a></h1>
  <nav>
    <a href="/one">One</a>
    <a href="/two">Two</a>
</nav>`,
                1000,
                "",
            ]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
                whiteSpace: "pre-line",
                display: "block",
            }}
            className="text-yellow-100"
        />

    </div>

</div>
    

    </div>
  )
}

export default CodeBlocks