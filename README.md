# Selise Transport App

Selise Transport is a bus booking management app that allows users to view available seats for buses, book seats, and provides an admin panel to manage bus bookings. The app provides a user-friendly interface for booking seats and an admin dashboard for monitoring and managing bookings.

##url
https://selise-transport-app.netlify.app/

## Features

- **User Booking**: Users can select buses, view available seats, and book seats.
- **Admin Panel**: Admins can view booked seats for a specific bus and manage bookings.
- **Seat Layout**: Displays the available and booked seats with a visual representation.
- **Toast Notifications**: Provides notifications for actions such as booking and seat selection.
- **Dynamic Routing**: Allows navigation between the User Booking page and the Admin Panel using React Router.

## Tech Stack

- **React**: JavaScript library for building the user interface.
- **React Router**: Routing library to manage navigation in the app.
- **React Icons**: Used for adding icons like bus and clock.
- **React Hot Toast**: For showing toast notifications.
- **Tailwind CSS**: Utility-first CSS framework for styling the app.
- **TypeScript**: Adds static type checking to JavaScript.

## How It Works

1. **User Flow**:
   - Users can select a bus to view the available seats.
   - Users can click on seats to book them.
   - Once a seat is selected, users will see a form to fill in details like name, destination, and time.

2. **Admin Panel**:
   - Admins can view all buses and their booking status.
   - Admins can select a bus to view detailed seat information and bookings.

3. **Seat Layout**:
   - The seat layout displays seat IDs, with booked seats visually differentiated.
   - Admins can see which seats are booked and click on a seat to view passenger details.

## Prerequisites

Before running the app, make sure you have the following installed:
- **Node.js**: [Download here](https://nodejs.org/)
- **npm**: Comes with Node.js (use `npm -v` to check)

## Installation

Follow these steps to set up the app on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/selise-transport.g
cd selise-transport
npm run dev


