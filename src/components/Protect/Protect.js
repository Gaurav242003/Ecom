import React, { Children } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
const Protect = ({children}) => {
    const myUser=useSelector(state=> state.user.currentUser);
    console.log(myUser);
  return (
    <div>
        {myUser ? Children: <Navigate  to='/signin'/>}
    </div>
  )
}

export default Protect