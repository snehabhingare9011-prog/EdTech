import React from 'react'

const HighlightText = (props) => {
  return (
    <span className="font-bold bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
      {props.children}
    </span>
 
  )
}

export default HighlightText