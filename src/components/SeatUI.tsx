import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookSeat } from '../redux/appSlice';
import { RootState } from '../redux/store';
import Seat from './Seat';
import BookingForm from './BookingFrom';
import toast, { Toaster } from 'react-hot-toast';
import { FaBus, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa'; // Add icons

const SeatUI: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<string>('S098'); // Default bus
  const [showForm, setShowForm] = useState(false);
  const buses = useSelector((state: RootState) => state.app.buses);
  const bus = buses[selectedBus]; // Get the selected bus

  const times = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']; // Example time slots
  const [destination, setDestination] = useState<string>(''); // Store destination dynamically

  useEffect(() => {
    const savedBooking = localStorage.getItem('buses');
    if (savedBooking) {
      const parsedBooking = JSON.parse(savedBooking);
      dispatch({
        type: 'app/loadBuses',
        payload: parsedBooking,
      });
    }
  }, [dispatch]);

  const handleSeatClick = (seatId: string) => {
    if (!bus) return;
    const seat = bus.seats[seatId];
    if (seat.booked) {
      toast.error('This seat is already booked!');
    } else {
      setSelectedSeat(seatId);
      setShowForm(true);
      toast.success(`Seat ${seatId} selected!`);
    }
  };

  const handleBooking = (name: string, destination: string, time: string) => {
    if (selectedSeat) {
      dispatch(
        bookSeat({
          busId: selectedBus,
          seatId: selectedSeat,
          name,
          destination,
          time,
        })
      );

      const bookingData = {
        busId: selectedBus,
        seatId: selectedSeat,
        name,
        destination,
        time,
      };
      localStorage.setItem('busBooking', JSON.stringify(bookingData));

      // Dynamically update the destination and booked seats
      setDestination(destination); // Update the destination based on the booking
      setShowForm(false);
      toast.success('Booking complete!');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the booking form when the user clicks "Cancel"
  };

  const handleBusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBus(e.target.value);
    setSelectedSeat(null); // Reset the selected seat when switching buses
    setDestination(''); // Reset the destination when switching buses
  };

  if (!bus) {
    return <div>Loading bus data...</div>;
  }

  const bookedSeatsCount = Object.values(bus.seats).filter(
    (seat) => seat.booked
  ).length;

  return (
    <div className="flex p-4 space-x-8">
      <Toaster />

      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Bus Info</h3>
        <div className="flex items-center mb-4">
          <FaBus className="text-blue-600 mr-2" />
          <span className="font-semibold">Bus {selectedBus}</span>
        </div>
        <div className="flex items-center mb-4">
          <FaClock className="text-blue-600 mr-2" />
          <span className="font-semibold">Timing: {times.join(', ')}</span>
        </div>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-blue-600 mr-2" />
          <span className="font-semibold">
            Destination: {destination || 'Select a seat to book'}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <FaUsers className="text-blue-600 mr-2" />
          <span className="font-semibold">
            Booked Seats: {bookedSeatsCount} / {Object.keys(bus.seats).length}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-4">Bus Seat Booking</h2>

        {/* Bus Selector */}
        <div className="mb-4">
          <label className="font-semibold mr-2 text-lg">Select Bus:</label>
          <div className="relative">
            <select
              value={selectedBus}
              onChange={handleBusChange}
              className="appearance-none bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 text-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              {Object.keys(buses).map((busId) => (
                <option key={busId} value={busId}>
                  {busId}
                </option>
              ))}
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Seat Layout */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Left Column - 1 Seat per Row */}
          <div className="flex flex-col items-center">
            {['A1', 'B1', 'C1', 'D1', 'E1'].map((seatId) => (
              <div key={seatId} className="mb-4">
                <Seat
                  key={seatId}
                  seat={bus.seats[seatId]}
                  onClick={() => handleSeatClick(seatId)}
                  className="w-16 h-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-bold rounded-lg flex justify-center items-center text-xl transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl"
                >
                  {seatId}
                </Seat>
              </div>
            ))}
          </div>

          {/* Right Column - 2 Seats per Row */}
          <div className="flex flex-col items-center ml-10">
            {['A', 'B', 'C', 'D', 'E'].map((row) => (
              <div key={row} className="flex mb-4 space-x-4">
                {[`${row}2`, `${row}3`].map((seatId) => (
                  <div key={seatId} className="flex flex-col items-center">
                    <Seat
                      key={seatId}
                      seat={bus.seats[seatId]}
                      onClick={() => handleSeatClick(seatId)}
                      className="w-16 h-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-bold rounded-lg flex justify-center items-center text-xl transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl"
                    >
                      {seatId}
                    </Seat>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <BookingForm
            seatId={selectedSeat}
            busId={selectedBus}
            onConfirm={handleBooking}
            onClose={handleCloseForm}
            times={times}
          />
        )}
      </div>
    </div>
  );
};

export default SeatUI;
