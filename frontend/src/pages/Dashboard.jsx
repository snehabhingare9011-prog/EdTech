
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from "../components/common/Loader"
import { useSelector } from 'react-redux'


const Dashboard = () => { 
  const authLoading = useSelector((state) => state.auth.loading);
  const profileLoading = useSelector((state) => state.profile.loading);

  return (
    <div className='flex-1 w-full flex bg-richblack-900 overflow-hidden h-full'>
      <div className='w-60 h-full'>
        <Sidebar />
      </div>
      <div className='flex-1 h-full flex justify-center overflow-y-auto hide-scrollbar relative' id='dashboard-content'>
        <div className='w-full max-w-250 h-full py-10 px-10'>
          {
            (authLoading || profileLoading) ? <div className='w-full h-full flex items-center justify-center'><Loader /></div> : <Outlet />
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard