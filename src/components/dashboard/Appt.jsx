// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Appointments() {
    const doctors = [
        {id: 0, name:"Dr.Hussein", Date: "15-nov-2017" ,time:"10:30AM"},
        {id: 1, name:"Dr.Hussein", Date: "15-nov-2017" ,time:"10:30AM"},
        {id: 2, name:"Dr.Hussein", Date: "15-nov-2017" ,time:"10:30AM"}
    ]
  return (
    <div className='grid justify-items-center m-8 '>
        <div className='border rounded-xl shadow-lg  my-4'>
            <h3 className='text-xl font-bold mb-2 '>Appointments</h3>
            <hr className='border-2 border-custom-green' />
            
            {doctors.map((doctor) =>
            <div key={doctor.id} className='flex flex-row gap-x-4 '> 
                <div>
                <h3 className=''>Doctor</h3>
                <p className='font-medium'>{doctor.name}</p>
                </div>
                <div>
                <h3>Date</h3>
                <p className='font-gray-600'>{doctor.Date}</p>  
                </div>
                <div>
                <h3>Time</h3>
                <p className='font-gray-600'>{doctor.time}</p>

                </div>
            </div>
            
            )}
            <div className='border-b'></div>
            <button className='text-center cursor-progress'>View More</button>
        </div>
    </div>
  )
}
