import React from 'react'
import FarmerProfile from './FarmerProfile'
import VendorProfile from './VendorProfile'
import useTokenStore from '../http/store'

const Profile = () => {
    const role=useTokenStore.getState().role
  return (
    
        role==="farmer" ? <FarmerProfile/> : <VendorProfile/>
  )
}

export default Profile