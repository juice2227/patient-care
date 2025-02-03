// eslint-disable-next-line no-unused-vars
import React from 'react'
import { IoCall } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
import doc from "../assets/doc1.jpg"
export default function BookingActivity() {
  return (
    <div>
    <div className='flex flex-row x-4'>
    <p>Upcoming</p>
    <p>Completed</p>
    <p>Cancelled</p>
    </div>
        
        <div className='grid gap-4 grid-col-4'>
            <div className='flex flex-row '>
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
               <div className='p-8'>
                <div className='tracking-wide text-sm text-black font-bold'>Dr.Nick Jonas</div> 
                <p className='text-gray-500'>Alphavirus</p>
                <div className='flex flex-row'>
                <p>10:30am -11:00am</p>
                <IoMdTime />
                </div>
                <hr />
                <div className='flex flex-row gap-2'>
                <img src= {doc} alt="" height={50} width={50} />
                <div className='flex flex-col'>
                <h4>Dr.Nick Jones</h4>
                <p className='text-gray-500'>+123 789 0765 </p>

                </div>
                <IoCall />
                <RiMessage2Line />
                </div>
                <hr />
                <button className='bg-blue-500 rounded px-4 py-2'>Booking Details</button>

               </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
               <div className='p-8'>
                <div className='tracking-wide text-sm text-black font-bold'>Dr.Nick Jonas</div> 
                <p className='text-gray-500'>Alphavirus</p>
                <div className='flex flex-row'>
                <p>10:30am -11:00am</p>
                <IoMdTime />
                </div>
                <hr />
                <div className='flex flex-row gap-2'>
                <img src= {doc} alt="" height={50} width={50} />
                <div className='flex flex-col'>
                <h4>Dr.Nick Jones</h4>
                <p className='text-gray-500'>+123 789 0765 </p>

                </div>
                <IoCall />
                <RiMessage2Line />
                </div>
                <hr />
                <button className='bg-blue-500 rounded px-4 py-2'>Booking Details</button>

               </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
               <div className='p-8'>
                <div className='tracking-wide text-sm text-black font-bold'>Dr.Nick Jonas</div> 
                <p className='text-gray-500'>Alphavirus</p>
                <div className='flex flex-row'>
                <p>10:30am -11:00am</p>
                <IoMdTime />
                </div>
                <hr />
                <div className='flex flex-row gap-2'>
                <img src= {doc} alt="" height={50} width={50} />
                <div className='flex flex-col'>
                <h4>Dr.Nick Jones</h4>
                <p className='text-gray-500'>+123 789 0765 </p>

                </div>
                <IoCall />
                <RiMessage2Line />
                </div>
                <hr />
                <button className='bg-blue-500 rounded px-4 py-2'>Booking Details</button>

               </div>
            </div>
            
            
            </div>

            <div className='flex flex-row'>
            
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
               <div className='p-8'>
                <div className='tracking-wide text-sm text-black font-bold'>Dr.Nick Jonas</div> 
                <p className='text-gray-500'>Alphavirus</p>
                <div className='flex flex-row'>
                <p>10:30am -11:00am</p>
                <IoMdTime />
                </div>
                <hr />
                <div className='flex flex-row gap-2'>
                <img src= {doc} alt="" height={50} width={50} />
                <div className='flex flex-col'>
                <h4>Dr.Nick Jones</h4>
                <p className='text-gray-500'>+123 789 0765 </p>

                </div>
                <IoCall />
                <RiMessage2Line />
                </div>
                <hr />
                <button className='bg-blue-500 rounded px-4 py-2'>Booking Details</button>

               </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
               <div className='p-8'>
                <div className='tracking-wide text-sm text-black font-bold'>Dr.Nick Jonas</div> 
                <p className='text-gray-500'>Alphavirus</p>
                <div className='flex flex-row'>
                <p>10:30am -11:00am</p>
                <IoMdTime />
                </div>
                <hr />
                <div className='flex flex-row gap-2'>
                <img src= {doc} alt="" height={50} width={50} />
                <div className='flex flex-col'>
                <h4>Dr.Nick Jones</h4>
                <p className='text-gray-500'>+123 789 0765 </p>

                </div>
                <IoCall />
                <RiMessage2Line />
                </div>
                <hr />
                <button className='bg-blue-500 rounded px-4 py-2'>Booking Details</button>

               </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
               <div className='p-8'>
                <div className='tracking-wide text-sm text-black font-bold'>Dr.Nick Jonas</div> 
                <p className='text-gray-500'>Alphavirus</p>
                <div className='flex flex-row'>
                <p>10:30am -11:00am</p>
                <IoMdTime />
                </div>
                <hr />
                <div className='flex flex-row gap-2'>
                <img src= {doc} alt="" height={50} width={50} />
                <div className='flex flex-col'>
                <h4>Dr.Nick Jones</h4>
                <p className='text-gray-500'>+123 789 0765 </p>

                </div>
                <IoCall />
                <RiMessage2Line />
                </div>
                <hr />
                <button className='bg-blue-500 rounded px-4 py-2'>Booking Details</button>

               </div>
            </div>
            
            </div>
            
        </div>
    </div>
  )
}
