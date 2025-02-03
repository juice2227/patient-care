import React from "react";

const DoctorMessageCard = ({ doctorName, message, dateTime }) => {
  return (
    <div className="mt-4 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <h4 className="text-lg font-semibold">Message from {doctorName}</h4>
      <p className="text-gray-700">{message}</p>
      <p className="text-sm text-gray-500">Sent on: {dateTime ? new Date(dateTime).toLocaleString() : "N/A"}</p>
    </div>
  );
};

export default DoctorMessageCard;
