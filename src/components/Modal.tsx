import React from 'react';

interface ModalProps {
  seatId: string;
  name: string;
  destination: string;
  time: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  seatId,
  name,
  destination,
  time,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Passenger Details</h3>
        <p>
          <strong>Seat Number:</strong> {seatId}
        </p>
        <p>
          <strong>Passenger Name:</strong> {name}
        </p>
        <p>
          <strong>Destination:</strong> {destination}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
