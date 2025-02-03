// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdEdit ,MdDelete , MdEmail} from "react-icons/md";
import { fetchPrescriptions, updatePrescription, deletePrescription } from "../firebase/PrescriptionFunction";



function Appointments() {
  const Appointment = [
    {id:0,service:"X-ray",Location:"HSR Layout",DATE:"15-nov-2025",Time:"10:30AM",EDIT:"EDIT",Delete:"delete",Message:"message" },
    {id:0,service:"X-ray",Location:"HSR Layout",DATE:"15-nov-2025",Time:"10:30AM",EDIT:"EDIT",Delete:"delete",Message:"message" },
    {id:0,service:"X-ray",Location:"HSR Layout",DATE:"15-nov-2025",Time:"10:30AM",EDIT:"EDIT",Delete:"delete",Message:"message" },
    {id:0,service:"X-ray",Location:"HSR Layout",DATE:"15-nov-2025",Time:"10:30AM",EDIT:"EDIT",Delete:"delete",Message:"message" },
    {id:0,service:"X-ray",Location:"HSR Layout",DATE:"15-nov-2025",Time:"10:30AM",EDIT:"EDIT",Delete:"delete",Message:"message" },
    {id:0,service:"X-ray",Location:"HSR Layout",DATE:"15-nov-2025",Time:"10:30AM",EDIT:"EDIT",Delete:"delete",Message:"message" },
  ];
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };
  return (
    <div>
        {/**the appointment history */}
        <div className='border rounded-xl shadow-lg bg-white'>
        <FaRegCalendarAlt className='color-custom-green'/>
            <h3 className='flex flex-row'>Appointment History</h3>
            <hr className='border-2 border-custom-green' />
            <hr className='border-2 border-custom-green' />
            {/**the icons */}
              <div className='flex flex-row'>
                  <div>
                  <button className='cursor-progress' onClick={() => console.log("printer clicked")}>
                    <IoPrintOutline />
                    <span>Print</span>
                  </button>
                </div>
                
                <label>
                <input type="checkbox" name="History" id="" 
                checked={isChecked}
                onChange={handleOnChange}
                
                className='w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500'
                />
                <span>History</span>

                </label>
                <label>
                <input type="checkbox" name="History" id="" 
                checked={isChecked}
                
                onChange={handleOnChange}
                className='w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500'
                />
                <span>Show all</span>

                </label>
              </div>
              <hr className=' w-4 border-custom-green' />
              
              <div className='flex flex-row gap-x-4'>
                <h2>SERVICE</h2>
                <h2>LOCATION</h2>
                <h2>DATE</h2>
                <h2>TIME</h2>
                <h2>EDIT</h2>
                <h2>DELETE</h2>
                <h2>MESSAGE</h2>

                </div>
              {Appointment.map((booking) => 
              <div key={booking.id}>
                
                <div className='flex flex-row gap-x-4'>
                <input type="checkbox" name="" id="" />
                  <div>
                  <p>{booking.service}</p>
                  </div>
                  <div>
                  
                  <p>{booking.Location}</p>
                  </div>
                  <div>
                  
                  <p>{booking.DATE}</p>

                  </div>

                  <div>
                    
                  <p>{booking.Time}</p>

                  </div>
                  
                  <div>
                  <MdEdit />
                  <p>{booking.EDIT}</p>

                  </div>
                  
                  <div>
                    
                  <MdDelete />
                  <p>{booking.Delete}</p>

                  </div>
                  
                  <div>
                  <MdEmail />
                  <p>{booking.Message}</p>

                  </div>
                  

                </div>
              </div>
              
              )}

        </div>

         {/**Request new appointment */}
        <div>
          <div className='border rounded-xl shadow-lg ' >
          <FaRegCalendarAlt className='color-custom-green'/>
            <h2>Request New Appointment</h2>
            {/**first part of the charvon progress bar */}
            <p>Appointment type</p>
            <select>
              <option>--select--</option>
              <option>X-ray</option>
              <option>Kelatin treatment</option>
              <option>Physical</option>
            </select>

            <p>Other</p>
            <select>
              <option>--select--</option>
              <option>X-ray</option>
              <option>Kelatin treatment</option>
              <option>Physical</option>
            </select>
            <label>
                <input type="checkbox" name="History" id="" 
                
                className='w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500'
                />
                <span>I'm not sure</span>

            </label>
            <button className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto'>Next</button>
                {/**second part of the progressbar */}
            <div>
              <input type="checkbox" name="" id="" />
              <h3>HSR LAYOUT</h3>
              <p>Hours</p>
              <p>Mon-thur 7:00 am to 6:30pm, fri 8:00am to 5:00am</p>
              <p>Address</p>
              <p>19th Main road, sector3, <br /> HsR LAYOUT NATION,Bangorelo - 12355657 </p>
              <button type="button">Update Location</button>
              <button>Back</button>
              <button>Next</button>
            </div>
            {/**second part of the progressbar */}
            <div>
              <p>Please your time and date preference along with any additional comments to our scheduling staff.</p>
              <div>
                <p>Appointment Date and Time Prefereence 1</p>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
                <FaRegCalendarAlt  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select>
                  <option>--select--</option>
                  <option>X-RAY</option>
                  <option>Physical</option>
                  <option>Physical</option>
                </select>

                <h3>Appointment Additional Notes</h3>
                <input type="text" placeholder='Any additional thing' className='w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500' />

              </div>
              <button className='text-green-500'>Submit Request</button>

            </div>
          </div>
          
          

        </div>
      
    </div>
  )
}

export default Appointments
