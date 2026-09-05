import React from 'react'
import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
import UpdatePassword  from "./UpdatePassword";
import  DeleteAccount from "./DeleteAccount"


const Settings = () => {
  return (
    <div className='font-inter pb-6'>
          <h1 className='text-white text-4xl font-semibold mb-5'>Edit Profile</h1>
            
            <ChangeProfilePicture/>
            <EditProfile />
            <UpdatePassword />
            <DeleteAccount />
        </div>
  )
}


export default Settings