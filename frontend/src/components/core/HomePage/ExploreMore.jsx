import React, { useState } from 'react'
import HighlightText from './HighlightText'
import Tabs from './Tabs'
import {HomePageExplore} from "../../../data/homepage-explore";
import Card from './Card';


const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(HomePageExplore[0].tag)
    console.log("currentTab",currentTab);
    const freeCourses=HomePageExplore.find((item)=>item.tag===currentTab);
    

  return (
    <div>
        <div className='text-4xl font-semibold'>
            Unlock the
            <HighlightText text={" Power of Code"} textColor={"text-caribbeangreen-25"}/>
        </div>

        <div className=' text-center text-[15px] font-bold text-richblack-300 mt-2'>
          Learn to Build Anything You Can Imagine
        </div>

        {/* tabs */}
         <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>

         {/* Cards */}
         <div className='flex flex-row gap-2 justify-between'>
            {
                freeCourses.courses.map((item,index)=>{
                    return <Card key={index} item={item} index={index} ></Card>
                })
              
            }
         </div>

         
         


    </div>
  )
}

export default ExploreMore