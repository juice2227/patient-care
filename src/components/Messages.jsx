// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { MdEdit, MdDelete, MdEmail , MdPresentToAll} from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { IoRefresh } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";
import { TiArrowForward } from "react-icons/ti";
function Messages({ totalStars = 1, name = "rating" }) {
  const Appointment = [
    { id: 1, from: "X-ray", subject: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Messagetype: "message" },
    { id: 2, from: "X-ray", subject: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Messagetype: "message" },
    { id: 3, from: "X-ray", subject: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Messagetype: "message" },
    { id: 4, from: "X-ray", subject: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Messagetype: "message" },
    { id: 5, from: "X-ray", subject: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Messagetype: "message" },
    { id: 6, from: "X-ray", subject: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Messagetype: "message" },
  ];

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className='grid grid-rows-2 grid-flow-col gap-4'>
      <div className='border rounded-xl shadow-lg  p-4'>
        <div className='flex items-center gap-2 mb-4'>
          <MdEmail className='text-custom-green text-xl' />
          <h3 className='text-lg font-semibold'>Inbox</h3>
          <button className='flex justify-items-end border-2 border-black text-white rounded-lg cursor-pointer'>Compose New</button>
        </div>
        <hr className='border-2 border-custom-green mb-4' />
        {/**the icons */}
        <div className='flex flex-row gap-6 border bg-gray-500 p-2'>
        <div className='flex flex-row space-x-2 items-center '>
        <div className='flex items-center border border-gray-300 bg-gray-500 rounded px-2 py-1'>
          <input type="checkbox" name="" id="" checked/>
            <p>Check All</p>
            
          </div>
          
          <div className='flex items-center border border-gray-300 rounded px-2 py-1'>
          <AiOutlineClear />
          <p>Sent items</p>
          </div>
          <div className='flex items-center border border-gray-300 rounded px-2 py-1'>
          <IoRefresh />
          <p>refresh</p>

          </div>
        </div>
        <div className='flex flex-row space-x-2 items-center '>
            <div className='flex items-center border border-gray-300 rounded px-2 py-1'>
            <p>Drafts</p>
            <HiOutlineMailOpen />
            </div>
            
            <div className='flex items-center border border-gray-300 rounded px-2 py-1'>
            <p>Clear All</p>
            <MdPresentToAll />
            </div>
            <div className='flex items-center border border-gray-300 rounded px-2 py-1'>
            <MdDelete className='text-lg' />
            <p>Delete</p>
            </div> 
        </div>
        </div>
        {/**the second icons part */}
        <div className=''>
          <div className='flex justify-between '>
            <div>
              <p className='text-custom-green font-bold'>155 Messages</p>
            </div>
            <div className='flex items-center'>
            <IoPrintOutline />
            <TiArrowForward />
            <MdDelete className='text-lg' />
              
            </div>
            
              <div className='flex items-center space-x-2'>
              <p>Display</p>
              <select className=''>
                {[1, 2, 3, 4, 5, 6, 7,8 , 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='py-2 px-4 text-left'>
                  <input type="checkbox" className='rounded' />
                </th>
                <th className='py-2 px-4 text-left font-semibold'>from</th>
                <th className='py-2 px-4 text-left font-semibold'>LOCATION</th>
                <th className='py-2 px-4 text-left font-semibold'>DATE</th>
                <th className='py-2 px-4 text-left font-semibold'>TIME</th>
                <th className='py-2 px-4 text-left font-semibold'>EDIT</th>
                <th className='py-2 px-4 text-left font-semibold'>DELETE</th>
                <th className='py-2 px-4 text-left font-semibold'>MESSAGE TYPE</th>
              </tr>
            </thead>
            <tbody>
              {Appointment.map((booking) => (
                <tr key={booking.id} className='border-t hover:bg-gray-50'>
                  <td className='py-2 px-4'>
                    <input type="checkbox" className='rounded' />
                  </td>
                  <td className='py-2 px-4'>
                  {[...Array(totalStars)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index} className="cursor-pointer">
                                <input
                                type="radio"
                                    name={name}
                                    value={currentRating}
                                    className="hidden"
                                    onChange={() => setRating(currentRating)}
                                />
                                <FaRegStar
                                    className={`w-5 h-5 transition-colors ${
                                    currentRating <= (hover || rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(0)}
                                />
                                </label>
                            );
                            })}

                  </td>
                  <td className='py-2 px-4'>{booking.from}</td>
                  <td className='py-2 px-4'>{booking.subject}</td>
                  <td className='py-2 px-4'>{booking.DATE}</td>
                  <td className='py-2 px-4'>{booking.Time}</td>
                  <td className='py-2 px-4'>
                    <button className='flex items-center gap-1 text-blue-600 hover:text-blue-800'>
                      <MdEdit className='text-lg' />
                      {booking.EDIT}
                    </button>
                  </td>
                  <td className='py-2 px-4'>
                    <button className='flex items-center gap-1 text-red-600 hover:text-red-800'>
                      <MdDelete className='text-lg' />
                      {booking.Delete}
                    </button>
                  </td>
                  <td className='py-2 px-4'>
                    <button className='flex items-center gap-1 text-green-600 hover:text-green-800'>
                      <MdEmail className='text-lg' />
                      {booking.Messagetype}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-4">
        
      </div>
      {/**the card */}
      <div className='border rounded-xl shadow-lg bg-white p-4'>
        
          <h3 className='bg-gray-500'>Appointment Confirmation</h3>
          <div className='flex flex-row gap-1'>
          <p className='font-bold'>From:</p>
          <h4>Dr.Rajev</h4>
          </div>
          <div  className='flex flex-row gap-1'>
          <p className='font-bold'>To: </p>
          <h4>Anul Prasad</h4>
          </div>
          <div className='flex flex-row gap-1'>
          <p className='font-bold'>Time:</p>
          <h4>5:30 PM</h4>
          </div>
          <p>Dear sir,</p>
          <p>This is to confirm your appointment at patient care of Bangolore at 5:30PM</p>
          <p>Regards,</p>
          <p>Dr.Rajeev</p>
          <hr />
          <div className='flex flex-row gap-1'>
          <p className='font-bold'>From:</p>
          <h4>Dr.Rahul</h4>
          </div>
          
          <div className='flex flex-row gap-1'>
          <p className='font-bold'>To:</p>
          <h4>Arul Prasad</h4>
          </div>
          
        
      </div>
    </div>
  );
}

export default Messages;