import React from 'react'
import { matchPath, NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import * as Icons from "react-icons/vsc"

const SidebarLink = ({iconName,link}) => {
    const Icon=Icons[iconName];
    const location=useLocation();

    function matchRoute(){
        return matchPath({path:link.path},location.pathname)
    }

    return (
        <NavLink
            to={link.path}
            className={`
                flex gap-3 text-md text-richblack-300 transition-all duration-200 items-center px-4 py-3 hover:bg-richblack-700 hover:text-richblack-5
                ${
                    matchRoute(link.path)
                    ? 'border-l-4 border-yellow-50 bg-yellow-800 text-yellow-50'
                    : ''
                }
            `}>
            <div className='flex items-center gap-x-2'>
                <Icon className='text-lg' />
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink