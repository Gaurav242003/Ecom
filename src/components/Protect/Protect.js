import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
const Protect = ({children}) => {
    const myUser=useSelector(state=> state.user.currentUser);
    //console.log(myUser);
  return (
    <div>
        {myUser ? children: <Navigate  to='/signin'/>}
    </div>
  )
}

export default Protect