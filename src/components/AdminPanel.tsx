import { useAppSelector } from '../hooks';
import { useState } from 'react';
import { FaBus, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa'; // Add icons
import Seat from './Seat'; // Assuming you already have this component
import BookingForm from './BookingFrom'; // Assuming you already have this form component
import Modal from './Modal'; // Import the modal component

const AdminPanel: React.FC = () => {
  const buses = useAppSelector((state) => state.app.buses);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState({
    seatId: '',
    name: '',
    destination: '',
    time: '',
  });

  const handleBusSelect = (busId: string) => {
    setSelectedBusId(busId);
  };

  const getBookedSeats = (busId: string) => {
    const bus = buses[busId];
    if (!bus) return [];
    const bookedSeats = Object.keys(bus.seats).filter(
      (seatId) => bus.seats[seatId].booked
    );
    return bookedSeats;
  };

  const handleSeatClick = (seatId: string) => {
    if (selectedBusId) {
      const bus = buses[selectedBusId];
      const seat = bus.seats[seatId];
      if (seat.booked) {
        // Show the modal with passenger details
        const details = seat.name
          ? { name: seat.name, destination: seat.destination, time: seat.time }
          : { name: 'N/A', destination: 'N/A', time: 'N/A' };

        setPassengerDetails({
          seatId,
          name: details.name,
          destination: details.destination,
          time: details.time,
        });
        setShowModal(true);
      } else {
        alert('This seat is not booked!');
      }
    }
  };

  const handleBooking = (name: string, destination: string, time: string) => {
    if (selectedSeat && selectedBusId) {
      // Handle booking logic here (e.g., dispatch action to book the seat)
      alert(
        `Seat ${selectedSeat} booked for ${name} to ${destination} at ${time}`
      );
      setShowForm(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the booking form
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  if (selectedBusId) {
    const bus = buses[selectedBusId];
    const bookedSeats = getBookedSeats(selectedBusId);

    return (
      <div className="p-4">
        <button
          onClick={() => setSelectedBusId(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center"
        >
          <FaBus className="mr-2" /> Back to Admin Panel
        </button>
        <h2 className="text-lg font-bold mb-4">
          Bookings for Bus {selectedBusId}
        </h2>
        <p>Total Booked Seats: {bookedSeats.length}</p>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Seat Layout */}
          {Object.keys(bus.seats).map((seatId) => (
            <div
              key={seatId}
              className={`w-12 h-12 ${
                bus.seats[seatId].booked ? 'bg-gray-400' : 'bg-blue-500'
              } text-white font-bold rounded-full flex justify-center items-center text-xs cursor-pointer hover:bg-opacity-75`}
              onClick={() => handleSeatClick(seatId)}
            >
              {seatId}
            </div>
          ))}
        </div>
        {/* Show booking form if a seat is selected */}
        {showForm && (
          <BookingForm onClose={handleCloseForm} onBook={handleBooking} />
        )}
        {/* Show modal with passenger details */}
        {showModal && (
          <Modal
            seatId={passengerDetails.seatId}
            name={passengerDetails.name}
            destination={passengerDetails.destination}
            time={passengerDetails.time}
            onClose={handleCloseModal}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 flex items-center">
        <FaBus className="mr-2" /> Admin Panel
      </h1>
      <div className="grid gap-4">
        {Object.values(buses).map((bus) => (
          <div
            key={bus.id}
            className="border p-4 rounded shadow-md flex items-center"
          >
            <div className="flex-grow">
              <h2 className="text-lg font-bold">{bus.id}</h2>
              <p>Total Booked Seats: {getBookedSeats(bus.id).length}</p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() => handleBusSelect(bus.id)}
            >
              <FaClock className="mr-2" /> View Bookings
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
