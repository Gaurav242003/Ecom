import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import {resetcurrentOrder} from '../../features/orderSlice'
import { resetCartOfUser,resetCart } from '../../features/cartSlice'

const OrderSuccess = () => {
  const dispatch =useDispatch()
  const user = useSelector(state => state.user.currentUser)
  const order=useSelector(state=>state.order.currentOrder)
  const params = useParams();
  const id = params.id
  useEffect(() => {
    dispatch(resetCartOfUser(user.id))
    dispatch(resetcurrentOrder())
  }, [dispatch,user])
  return (
    <>
    
      <div> <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order Successfull</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order ID #{id}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">You can see your orders in Profile {">"} myOrders</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={'/'}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>

          </div>
        </div>
      </main></div>
    </>

  )
}

export default OrderSuccess