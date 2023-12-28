
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import Cart from '../components/Cart/Cart'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { addUserAddress } from '../features/authSlice'
import { useEffect, useState } from 'react'
import { updateCart,deleteItem } from '../features/cartSlice'
import { addToOrder } from '../features/orderSlice'




export default function Checkout() {


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

  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const allAddress = useSelector(state => state.user.address)

    // console.log(allAddress)
    const [payment, setPayment] = useState('cod')
    const [address, setAddress] = useState(null)
    const user = useSelector(state => state.user.currentUser)
    const onSubmit = (data) => {
        dispatch(addUserAddress({ address: [...allAddress, data], id: user.id }))
       reset()
    }

    const handleAddress = (e, index) => {
        const temp = allAddress[index]
        setAddress(temp)

    }
    const handlePayment = (e) => {
        const temp = e.target.value
        setPayment(temp)

    }
   const handleOrder=()=>{
       dispatch(addToOrder({myCart,totalPrice,totalItem,user,address,payment}))
   }


    return (
        <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 bg-white lg:grid-cols-5 grid">
            <form className='lg:col-span-3  my-10' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12 ">


                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive products.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        {...register("fullName", {
                                            required: "Full Name is missing"
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.fullName && <p className='text-red-600'>{errors.fullName.message}</p>}
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mobile No.
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        name="mobileNo"
                                        id="mobileNo"
                                        {...register("mobileNo", {
                                            required: "Mobile No is missing",
                                            maxLength: {
                                                value: 10,
                                                message: "Enter Valid Mobile No"
                                            },
                                            minLength: {
                                                value: 10,
                                                message: "Enter Valid Mobile No"
                                            }
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.mobileNo && <p className='text-red-600'>{errors.mobileNo.message}</p>}
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        {...register("email", {
                                            required: 'Email is missing', pattern: {
                                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                message: 'Please enter valid email'

                                            }
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        id="streetAddress"
                                        {...register("streetAddress", {
                                            required: "Street Address is Missing"
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.streetAddress && <p className='text-red-600'>{errors.streetAddress.message}</p>}
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        {...register("city", {
                                            required: "City is Missing"
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.city && <p className='text-red-600'>{errors.city.message}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        {...register("state", {
                                            required: "State is Missing"
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.state && <p className='text-red-600'>{errors.state.message}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="pinCode"
                                        id="pinCode"
                                        {...register("pinCode", {
                                            required: "Pin Code is Missing"
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.pinCode && <p className='text-red-600'>{errors.pinCode.message}</p>}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">

                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save Address
                            </button>
                        </div>
                    </div>

                    {allAddress.length > 0 && <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose from existing address.
                        </p>

                        <div className="mt-10 space-y-10">
                            <ul role="list" className="divide-y divide-gray-100">
                                {allAddress && allAddress.map((place, index) => (
                                    <li key={index} className="flex justify-between gap-x-6 py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                            <input
                                                id={place.email}
                                                name='address'
                                                type="radio"
                                                onClick={e => handleAddress(e, index)}
                                               
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={place.imageUrl} alt="" /> */}
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{place.fullName}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{place.streetAddress}, {place.city}, {place.state}-{place.pinCode}</p>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">{place.mobileNo}</p>
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                {place.email}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Payment</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Choose payment option.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            value={"card"}
                                            onClick={e => handlePayment(e)}
                                          
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Card
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            value={"cod"}
                                            onClick={e => handlePayment(e)}
                                           
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            COD
                                        </label>
                                    </div>

                                </div>
                            </fieldset>
                        </div>
                    </div>}
                </div>

            </form>
            <div className='lg:col-span-2'>
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
                                                    <select className='ml-4 rounded-lg' onChange={e => handleChange(e, product)} value={product.quantity} >
                                                        <option value="1" >1</option>
                                                        <option value="2" >2</option>
                                                        <option value="3">3</option>

                                                    </select>
                                                </p>


                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        onClick={e => handleClick(e, product.id)}
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
                            <div
                                onClick={e=>handleOrder(e)}
                                className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Buy Now
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>


        </div>

    )
}
