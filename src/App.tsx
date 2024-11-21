import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AdminPanel from './components/AdminPanel';
import SeatUI from './components/SeatUI';
import { FaBus } from 'react-icons/fa';

const App: React.FC = () => {
  const [busId, setBusId] = useState<string | null>(null);

  useEffect(() => {
    // Set a default bus ID; this can be replaced with dynamic logic if required
    setBusId('bus-1');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header Section */}
        <header className="bg-blue-600 text-white p-2 sm:p-3 flex flex-col sm:flex-row justify-between items-center shadow-sm">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            {/* Bus logo */}
            <FaBus className="text-white w-6 h-6" />
            <h1 className="text-xl font-medium">Selise Transport</h1>
          </div>

          <nav className="flex justify-center sm:justify-end space-x-2 sm:space-x-4">
            {/* User Booking Button */}
            <Link
              to="/"
              className="text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-md bg-opacity-60 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
            >
              User Booking
            </Link>
            {/* Admin Panel Button */}
            <Link
              to="/admin"
              className="text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-md bg-opacity-60 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
            >
              Admin Panel
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-5">
          <Routes>
            <Route
              path="/"
              element={
                busId ? (
                  <SeatUI busId={busId} />
                ) : (
                  <div className="text-center text-base sm:text-lg">
                    Loading bus data...
                  </div>
                )
              }
            />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </div>
    </Router>
  );
};

export default App;
