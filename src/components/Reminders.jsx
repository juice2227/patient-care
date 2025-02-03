import React, { useState, useEffect } from 'react';
import { MdAlarmAdd, MdAlarmOff } from 'react-icons/md';
import { format, addMinutes } from 'date-fns';

const Reminder = ({ appointments = [] }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    
    const upcomingAppointments = appointments.filter(
      (app) => new Date(app.date) > new Date()
    );
    setReminders(
      upcomingAppointments.map((app) => ({
        ...app,
        reminderTime: addMinutes(new Date(app.date), -60),
        isReminded: false,
      }))
    );
  }, [appointments]);

  const toggleReminder = (appointment) => {
    setReminders((prev) =>
      prev.map((app) =>
        app.id === appointment.id
          ? { ...app, isReminded: !app.isReminded }
          : app
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
      {reminders.length > 0 ? (
        <ul>
          {reminders.map((appointment) => (
            <li
              key={appointment.id}
              className="flex items-center justify-between mb-2"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(appointment.date), 'MMM d, h:mm a')} -{' '}
                  {appointment.provider}
                </p>
                <p className="text-gray-500">{appointment.reason}</p>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => toggleReminder(appointment)}
              >
                {appointment.isReminded ? (
                  <MdAlarmOff size={20} />
                ) : (
                  <MdAlarmAdd size={20} />
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No upcoming appointments.</p>
      )}
    </div>
  );
};

export default Reminder;