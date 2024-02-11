import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
export default function RequireAuth({allowedRolles}) {
    const {isLoggedIn, role} = useSelector((state)=> state.auth)
    return (
        isLoggedIn && allowedRolles.find((myrole)=> (myrole == role)) ? (
            <Outlet /> // the route properly shows
        ):(
            isLoggedIn ? (<Navigate to= "/denied"/>) : (<Navigate to = "/signin" />)
        )
    )
}

