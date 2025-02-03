import React, { useState } from 'react'
import { MdEdit, MdDelete, MdEmail } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

function Messages({ totalStars = 1, name = "rating" }) {
  const Appointment = [
    { id: 1, service: "X-ray", Location: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Message: "message" },
    { id: 2, service: "X-ray", Location: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Message: "message" },
    { id: 3, service: "X-ray", Location: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Message: "message" },
    { id: 4, service: "X-ray", Location: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Message: "message" },
    { id: 5, service: "X-ray", Location: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Message: "message" },
    { id: 6, service: "X-ray", Location: "HSR Layout", DATE: "15-nov-2025", Time: "10:30AM", EDIT: "EDIT", Delete: "delete", Message: "message" },
  ];

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <div className='border rounded-xl shadow-lg bg-white p-4'>
        <div className='flex items-center gap-2 mb-4'>
          <MdEmail className='text-custom-green text-xl' />
          <h3 className='text-lg font-semibold'>Appointment History</h3>
        </div>
        <hr className='border-2 border-custom-green mb-4' />
        
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='py-2 px-4 text-left'>
                  <input type="checkbox" className='rounded' />
                </th>
                <th className='py-2 px-4 text-left font-semibold'>SERVICE</th>
                <th className='py-2 px-4 text-left font-semibold'>LOCATION</th>
                <th className='py-2 px-4 text-left font-semibold'>DATE</th>
                <th className='py-2 px-4 text-left font-semibold'>TIME</th>
                <th className='py-2 px-4 text-left font-semibold'>EDIT</th>
                <th className='py-2 px-4 text-left font-semibold'>DELETE</th>
                <th className='py-2 px-4 text-left font-semibold'>MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              {Appointment.map((booking) => (
                <tr key={booking.id} className='border-t hover:bg-gray-50'>
                  <td className='py-2 px-4'>
                    <input type="checkbox" className='rounded' />
                  </td>
                  <td className='py-2 px-4'>{booking.service}</td>
                  <td className='py-2 px-4'>{booking.Location}</td>
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
                      {booking.Message}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-4">
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
      </div>
    </div>
  );
}

export default Messages;