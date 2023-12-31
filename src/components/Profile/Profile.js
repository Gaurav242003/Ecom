import React, { useState, useEffect } from 'react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, CameraIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form"
import { addUserAddress,deleteUserAddress } from '../../features/authSlice';


import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { all } from 'axios';

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const allAddress = useSelector(state => state.user.address)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm()

    const handleEdit=(index)=>{
          seteditAddress(allAddress[index])
          setpopup(!popup)
    }
    const [editAddress,seteditAddress]= useState(null)
    const [popup, setpopup] = useState(false)
    const handlePopUp = () => {
        seteditAddress(null)
        setpopup(!popup)
        reset()
    }
    useEffect(() => {
        const body = document.querySelector('body');
        if (popup) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
        if(editAddress){
            for(let prop in editAddress){
                setValue(prop,editAddress[prop])
            }
        }

        return () => {
            body.style.overflow = 'auto'; // Reset body overflow when the component is unmounted
        };
    }, [popup,editAddress,setValue]);
   


    const onSubmit = (data) => {
        if(editAddress){
            const temp=[...allAddress]
            const index= allAddress.indexOf(editAddress)
            temp[index]=data;
            dispatch(addUserAddress({address:temp,id:user.id}))
        }else{
            dispatch(addUserAddress({ address: [...allAddress, data], id: user.id }))
        }
       
        handlePopUp()
    }

    const handleRemove=(e,index)=>{
           const temp=[...allAddress]
           temp.splice(index,1);
           const tempUser={...user,address:temp}
           dispatch(deleteUserAddress(tempUser))
          
    }
    return (
        <>
            {popup && <div className='fixed myform z-20 w-full h-screen flex justify-center items-center '><form className='lg:col-span-3  my-5 w-full p-5 pform border' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12 ">


                    <div className="border-b border-gray-900/10 pb-12 relative">
                        <div>
                            <div className='cross absolute z-40 text-red-500 cursor-pointer' onClick={handlePopUp}>
                                Close

                            </div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Add new address.</p>
                        </div>


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

                </div>

            </form></div>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen" >


                <div className="flex lg:flex-nowrap flex-wrap w-full h-screen">
                    <div className=" w-full flex relative pro">
                        <div className='z-10  absolute box w-full h-full flex items-center justify-center'>
                            <div className='relative'>
                                <img src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703808000&semt=ais'
                                    className='h-full w-full object-cover rounded-full myimg'
                                />
                                <div className='absolute camera bg-gray-100 cursor-pointer flex items-center justify-center'>
                                    <CameraIcon className='h-full w-full' />
                                </div>
                            </div>
                        </div>

                        <div className=' bg-gray-800 w-full'>

                        </div>
                        <div className='w-full bg-white'>

                        </div>
                    </div>
                    {user && <div className="bg-white w-full border">


                        <div className="border-b border-gray-900/10 p-5">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">My Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">You can edit your profile here.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">{user.username}</p>
                                   
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mobile No.
                                    </label>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">{user.phoneNo}</p>

                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">{user.email}</p>

                                </div>


                            </div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-7">Addresses</h2>
                            <div className="flex items-center justify-end gap-x-6">

                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handlePopUp}
                                >
                                    Add Address
                                </button>
                            </div>
                        </div>

                        {allAddress.length > 0 && <div className="border-b border-gray-900/10 p-5">

                            <div className="mt-10 space-y-10">
                                <ul role="list" className="divide-y divide-gray-100">
                                    {allAddress && allAddress.map((place, index) => (
                                        <li key={index} className="flex justify-between gap-x-6 py-5 p-5 border">
                                            <div className="flex min-w-0 gap-x-4">

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
                                            <div>
                                                <p className="text-sm leading-6 text-blue-600 cursor-pointer" onClick={e=>handleEdit(index)}>Edit</p>
                                                <p className="text-sm leading-6 text-red-600 cursor-pointer"  onClick={e=>handleRemove(e,index)}>Remove</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>}


                    </div>}
                </div>

            </div>


        </>

    );
};

export default Profile;
