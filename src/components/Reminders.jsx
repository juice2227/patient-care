// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { MdAlarmAdd, MdAlarmOff } from 'react-icons/md';
import { format, addMinutes } from 'date-fns';

const Reminders = ({ appointments = [] }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const upcomingAppointments = appointments.filter(
      (app) => new Date(app.date) > new Date()
    );

    const newReminders = upcomingAppointments.map((app) => ({
      ...app,
      reminderTime: addMinutes(new Date(app.date), -60),
      isReminded: false,
    }));

    // Convert to JSON strings to check if arrays are different
    const newRemindersString = JSON.stringify(newReminders);
    const currentRemindersString = JSON.stringify(reminders);

    if (newRemindersString !== currentRemindersString) {
      setReminders(newReminders);
    }
  }, [appointments]); // Do NOT include `reminders` in dependencies

  const toggleReminder = (appointmentId) => {
    setReminders((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, isReminded: !app.isReminded } : app
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
                onClick={() => toggleReminder(appointment.id)}
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

export default Reminders;
