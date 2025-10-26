# Save Segment Application

A React application that allows users to create and save customer segments with dynamic schema selection.

## Overview

This application provides a simple interface to create customer segments by selecting various attributes like first name, last name, gender, age, account name, city, and state. The selected segment data is sent to a webhook for processing.

## Installation

This project consists of two parts: a React frontend and a Node.js backend server.

### Frontend Setup

```bash
cd save-segment-poc
npm install
```

### Backend Setup

```bash
cd cors-proxy
npm install
```

## Running the Application

You need to run both the backend server and the frontend application.

### Start the Backend Server

Open a terminal and run:

```bash
cd cors-proxy
node server.js
```

The server will start on http://localhost:5000

### Start the Frontend Application

Open a new terminal window and run:

```bash
cd save-segment-poc
npm start
```

The application will open in your browser at http://localhost:3000

## How to Use

1. Click the "Save segment" button on the main page
2. Enter a name for your segment
3. Select a schema from the "Add schema to segment" dropdown
4. Click "+ Add new schema" to add it to your segment
5. Repeat steps 3-4 to add more schemas
6. You can change or remove schemas after adding them
7. Click "Save the Segment" to send the data

## Available Schemas

- First Name
- Last Name
- Gender
- Age
- Account Name
- City
- State

## Data Format

The application sends data in the following format:

```json
{
  "segment_name": "your_segment_name",
  "schema": [
    {"first_name": "First Name"},
    {"last_name": "Last Name"}
  ]
}
```

## Configuration

To use your own webhook URL, edit the `cors-proxy/server.js` file and update the webhook URL in the fetch call.

## Technologies Used

- React
- Node.js
- Express
- CSS

## Notes

- The backend server is required to handle CORS issues with webhook.site
- Make sure both servers are running before using the application
