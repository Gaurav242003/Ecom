import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../../features/authSlice'
import { Link } from 'react-router-dom'

const MyOrder = () => {
    const dispatch = useDispatch()
    const order = useSelector(state => state.user.MyOrder)
    const user = useSelector(state => state.user.currentUser)
    useEffect(() => {
        dispatch(getMyOrders(user?.id))
    }, [])
    //console.log(order)
    return (
        <>
            {order.length > 0 ? order.map((item, index) => <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8" key={index}>

                <div className="mt-8">
                    <h2 className="mt-10 my-5 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Order #{item.id}
                    </h2>
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {item.cart.map((product) => (
                                <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to={`/product-detail/${product.pid}`} className='cursor-pointer'>{product.title}</Link>
                                                </h3>
                                                <p className="ml-4">${product.price}</p>
                                            </div>
                                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {product.quantity}

                                            </p>


                                            <div className="flex">
                                                <p className='text-red-600'> Delivery status: {item.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <div className="border-t border-gray-200  py-6 ">
                    <div className="flex  justify-between my-2 text-base font-medium text-gray-900 ">
                        <p>Subtotal</p>
                        <p>${item.totalPrice}</p>
                    </div>
                    <div className="flex  justify-between my-2 text-base font-medium text-gray-900 ">
                        <p>Total Items</p>
                        <p>{item.totalItem} Items</p>
                    </div>
                    
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Delivery address:</h2>
                       
                        <div className="border-2 p-3 border-gray-200 space-y-10">
                            <ul role="list" className="divide-y divide-gray-100">
                                <div className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">

                                        {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={place.imageUrl} alt="" /> */}
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{item.deliveryAddress.fullName}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.deliveryAddress.streetAddress}, {item.deliveryAddress.city}, {item.deliveryAddress.state}-{item.deliveryAddress.pinCode}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">{item.deliveryAddress.mobileNo}</p>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            {item.deliveryAddress.email}
                                        </p>
                                    </div>
                                </div>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>) :  <>
    
    <div> <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">My Orders</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Place your first order!</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Add something to your cart from home page</p>
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
  </>}
        </>


    )
}

export default MyOrder