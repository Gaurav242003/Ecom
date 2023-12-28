import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart ,deleteItem} from '../../features/cartSlice'



export default function Cart() {

 

  const dispatch=useDispatch()
  const handleChange=(e,product) =>{
    // console.log(e.target.value)
    //console.log(product)
      dispatch(updateCart({...product,quantity:+e.target.value}))
      
   }
   const handleClick=(e,id)=>{
    dispatch(deleteItem(id))
   }
 
  const myCart=useSelector(state=>state.cart.items);
  const totalPrice=myCart.reduce((sum,item)=> sum+item.price*item.quantity,0)
  const totalItem=myCart.reduce((cnt,item)=> cnt+item.quantity,0)

  return (
 
    <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">

      <div className="mt-8">
        <h2 className="mt-10 my-5 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cart
        </h2>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {myCart.map((product) => (
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
                    <p className="text-gray-500">Qty
                    <select className='ml-4 rounded-lg'  onChange={e=> handleChange(e,product)} value={product.quantity} >
                      <option value="1" >1</option>
                      <option value="2" >2</option>
                      <option value="3">3</option>
                     
                    </select>
                    </p>
                   

                    <div className="flex">
                      <button
                        type="button"
                        onClick={e=> handleClick(e,product.id)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
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
          <p>${totalPrice}</p>
        </div>
        <div className="flex  justify-between my-2 text-base font-medium text-gray-900 ">
          <p>Total Items</p>
          <p>{totalItem} Items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
            to={'/checkout'}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            <Link to={'/'}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"

              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>

          </p>
        </div>
      </div>
    </div>
  )
}
