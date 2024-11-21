import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Seat and Bus types
interface Seat {
  id: string;
  booked: boolean;
  name?: string;
  destination?: string;
  time?: string;
}

interface Bus {
  id: string;
  seats: Record<string, Seat>;
}

interface AppState {
  buses: Record<string, Bus>;
}

// Load initial state from localStorage or fallback to hardcoded values
const loadBusesFromStorage = (): Record<string, Bus> => {
  const savedBuses = localStorage.getItem('buses');
  if (savedBuses) {
    return JSON.parse(savedBuses);
  }
  // Fallback to the initial hardcoded bus data if no data is found in localStorage
  return {
    S098: {
      id: 'S098',
      seats: {
        A1: { id: 'A1', booked: false },
        A2: { id: 'A2', booked: false },
        A3: { id: 'A3', booked: false },
        B1: { id: 'B1', booked: false },
        B2: { id: 'B2', booked: false },
        B3: { id: 'B3', booked: false },
        C1: { id: 'C1', booked: false },
        C2: { id: 'C2', booked: false },
        C3: { id: 'C3', booked: false },
        D1: { id: 'D1', booked: false },
        D2: { id: 'D2', booked: false },
        D3: { id: 'D3', booked: false },
        E1: { id: 'E1', booked: false },
        E2: { id: 'E2', booked: false },
        E3: { id: 'E3', booked: false },
      },
    },
    S099: {
      id: 'S099',
      seats: {
        A1: { id: 'A1', booked: false },
        A2: { id: 'A2', booked: false },
        A3: { id: 'A3', booked: false },
        B1: { id: 'B1', booked: false },
        B2: { id: 'B2', booked: false },
        B3: { id: 'B3', booked: false },
        C1: { id: 'C1', booked: false },
        C2: { id: 'C2', booked: false },
        C3: { id: 'C3', booked: false },
        D1: { id: 'D1', booked: false },
        D2: { id: 'D2', booked: false },
        D3: { id: 'D3', booked: false },
        E1: { id: 'E1', booked: false },
        E2: { id: 'E2', booked: false },
        E3: { id: 'E3', booked: false },
      },
    },
  };
};

const initialState: AppState = {
  buses: loadBusesFromStorage(),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    bookSeat: (
      state,
      action: PayloadAction<{
        busId: string;
        seatId: string;
        name: string;
        destination: string;
        time: string;
      }>
    ) => {
      const { busId, seatId, name, destination, time } = action.payload;
      const seat = state.buses[busId]?.seats[seatId];
      if (seat && !seat.booked && seatId !== 'DRIVER') {
        seat.booked = true;
        seat.name = name;
        seat.destination = destination;
        seat.time = time;

        // Save updated bus data to localStorage under the correct busId key
        const updatedBuses = { ...state.buses };
        localStorage.setItem('buses', JSON.stringify(updatedBuses));
      }
    },
  },
});

export const { bookSeat } = appSlice.actions;
export default appSlice.reducer;
