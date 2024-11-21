import React from 'react';

interface Seat {
  id: string;
  booked: boolean;
}

interface SeatProps {
  seat: Seat; // Ensure seat is always defined and non-null
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ seat, onClick }) => {
  // If the seat is the driver's seat, render it as non-clickable
  if (seat.id === 'DRIVER') {
    return (
      <div className=" w-20 h-20 flex items-center justify-center bg-gray-600 text-white rounded-lg">
        Driver
      </div>
    );
  }

  return (
    <div
      className={`w-20 h-20 flex items-center justify-center border rounded-lg cursor-pointer ${
        seat.booked
          ? 'bg-gray-400 cursor-not-allowed m-4'
          : 'bg-white hover:bg-blue-100 m-4'
      }`}
      onClick={!seat.booked ? onClick : undefined} // Prevent click if booked
    >
      <span className="text-sm">{seat.id}</span>
    </div>
  );
};

export default Seat;
