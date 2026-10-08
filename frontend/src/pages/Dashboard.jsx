
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from "../components/common/Loader"
import { useSelector } from 'react-redux'


const Dashboard = () => { 
  const authLoading = useSelector((state) => state.auth.loading);
  const profileLoading = useSelector((state) => state.profile.loading);

  return (
    <div className='fixed left-0 right-0 top-20 bottom-0 flex w-full overflow-hidden bg-richblack-900'>

      {/* Sidebar */}
      <div className='fixed left-0 top-20 bottom-0 w-60'>
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <div
        className='ml-60 flex h-full flex-1 justify-center overflow-y-auto hide-scrollbar'
        id='dashboard-content'
      >
        <div className='min-h-full w-full max-w-500 px-10 py-10'>
          {
            (authLoading || profileLoading)
              ? (
                <div className='flex h-full w-full items-center justify-center'>
                  <Loader />
                </div>
              )
              : <Outlet />
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard