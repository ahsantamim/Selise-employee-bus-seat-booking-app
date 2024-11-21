// src/data/busData.ts

export const destinations = [
  'Mirpur',
  'Uttara',
  'Dhanmondi',
  'Rampura',
  'Gulshan',
];

export const times = ['8:00 AM', '9:00 AM', '5:00 PM', '6:00 PM'];

export const buses = [
  {
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
      DRIVER: { id: 'DRIVER', booked: true },
    },
  },
  // Add 9 more buses with different IDs (S099, S100, etc.)
  {
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
      DRIVER: { id: 'DRIVER', booked: true },
    },
  },
  // Continue to add 8 more buses
];
