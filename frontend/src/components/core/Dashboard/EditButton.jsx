import React from 'react'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const EditButton = ({to}) => {
  return (
    <Link to={to} className='bg-yellow-50 px-4 py-2 rounded-md flex items-center gap-2' ><FaEdit />Edit</Link>
  )
}

export default EditButton