#!/bin/bash

echo "Starting Installation..."

if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Install it from https://nodejs.org."
  exit 1    
fi

cd Real-Time-Whiteboard/

echo "Installing dependencies..."
npm install

echo "Installation completed successfully!"
echo "Now Executing The Project"
npm start