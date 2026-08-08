import React from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";

const Tabs = ({currentTab,setCurrentTab}) => {
  return (
    <div className={`flex flex-row gap-2 `} >
        {
            HomePageExplore.map((ele,index)=>{
                return <div key={index} onClick={()=>setCurrentTab(ele.tag)} className={`${currentTab===ele.tag?"text-blue-100":"text-white"}`}>
                    {ele.tag}
                </div>
            })
        }

    </div>
  )
}

export default Tabs