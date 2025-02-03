import { FaEdit, FaTrash, FaEnvelope } from "react-icons/fa";

const Appointments = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>

      {/* Appointment History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Service</th>
              <th className="p-2">Location</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
              <th className="p-2">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">X-Ray</td>
              <td className="p-2">HSR Layout</td>
              <td className="p-2">15-Nov-2024</td>
              <td className="p-2">10:30 AM</td>
              <td className="p-2"><FaEdit className="text-blue-500 cursor-pointer" /></td>
              <td className="p-2"><FaTrash className="text-red-500 cursor-pointer" /></td>
              <td className="p-2"><FaEnvelope className="text-green-500 cursor-pointer" /></td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Physical</td>
              <td className="p-2">Madewalla</td>
              <td className="p-2">18-Nov-2024</td>
              <td className="p-2">08:30 AM</td>
              <td className="p-2"><FaEdit className="text-blue-500 cursor-pointer" /></td>
              <td className="p-2"><FaTrash className="text-red-500 cursor-pointer" /></td>
              <td className="p-2"><FaEnvelope className="text-green-500 cursor-pointer" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Request New Appointment Form */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Request New Appointment</h3>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700">Date Preference 1</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Time Preference 1</label>
            <select className="w-full p-2 border rounded">
              <option>-- Select --</option>
              <option>10:00 AM</option>
              <option>2:00 PM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700">Date Preference 2</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Time Preference 2</label>
            <select className="w-full p-2 border rounded">
              <option>-- Select --</option>
              <option>10:00 AM</option>
              <option>2:00 PM</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Additional Notes</label>
          <textarea className="w-full p-2 border rounded"></textarea>
        </div>

        <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded">Submit Request</button>
      </div>
    </div>
  );
};

export default Appointments;
