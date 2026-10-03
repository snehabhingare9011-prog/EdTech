import React from 'react'
import Rating from "react-rating";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"

const pra = () => {

    
  return (
    <div>

        <Rating
                      emptySymbol={
                        <TiStarOutline
                          size={30}
                          className="text-gray-500"
                        />
                      }
                      
                      fullSymbol={
                        <TiStarFullOutline
                          className="text-yellow-100"
                          size={30}
                        />
                      }
                      onChange={(n)=>console.log("sneha",n)}
                    />

    </div>
  )
}

export default pra