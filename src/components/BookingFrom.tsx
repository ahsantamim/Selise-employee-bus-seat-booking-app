import React, { useState, useEffect } from 'react';
import { FaBus } from 'react-icons/fa'; // Importing the logo (or you can use your custom logo)

interface BookingFormProps {
  seatId: string;
  busId: string;
  onClose: () => void;
  onConfirm: (name: string, destination: string, time: string) => void;
  times: string[]; // Times array passed as prop
}

const BookingForm: React.FC<BookingFormProps> = ({
  seatId,
  busId,
  onClose,
  onConfirm,
  times,
}) => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState<string>(times?.[0] || ''); // Safe access

  const locations = [
    'Mirpur',
    'Gulshan',
    'Bashundhara',
    'Dhanmondi',
    'Rampura',
    'Malibagh',
  ]; // Dropdown locations

  // Handle time change when times array updates
  useEffect(() => {
    if (times.length > 0 && !times.includes(time)) {
      setTime(times[0]); // Reset to first time if selected time is no longer available
    }
  }, [times]);

  const handleSubmit = () => {
    if (!name || !destination || !time) {
      alert('Please fill in all fields.');
      return;
    }
    onConfirm(name, destination, time);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96 max-w-lg space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <FaBus className="text-blue-500 w-12 h-12" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Booking Seat {seatId}
        </h3>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Destination Dropdown */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2">
            Destination
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out appearance-none"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="" disabled>
              Select Destination
            </option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {/* Centered Custom arrow for select */}
          <div className="absolute top-0 right-0 px-3 py-4 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 9.793l5.646-5.147a.5.5 0 1 1 .708.707l-6 5.5a.5.5 0 0 1-.708 0l-6-5.5a.5.5 0 0 1 0-.707z" />
            </svg>
          </div>
        </div>

        {/* Time Dropdown */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2">
            Departure Time
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out appearance-none"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {times.length > 0 ? (
              times.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))
            ) : (
              <option disabled>No available times</option>
            )}
          </select>
          {/* Centered Custom arrow for select */}
          <div className="absolute top-0 right-0 px-3 py-4 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 9.793l5.646-5.147a.5.5 0 1 1 .708.707l-6 5.5a.5.5 0 0 1-.708 0l-6-5.5a.5.5 0 0 1 0-.707z" />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none transition duration-300 transform hover:scale-105"
            onClick={handleSubmit}
          >
            Book Seat
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 focus:outline-none transition duration-300 transform hover:scale-105"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
