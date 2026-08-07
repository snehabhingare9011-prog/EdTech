import React from 'react'

const HighlightText = ({text,textColor}) => {
  return (
    <span className={`font-bold ${textColor}`}> 
        {" "}
        {text}
        {" "}
    </span>
  )
}

export default HighlightText;