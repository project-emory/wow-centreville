#!/bin/bash

# This script automatically checks if a virtual environment named `venv` exists
# in the project, creating and installing dependencies if it doesn't and
# activating the virtual environment if it does.
# Requirements: python 3.11
# Usage: $ source ./setup.sh

if [ ! -d "./venv/" ]; then
    echo "Installing dependencies..."
    python -m venv ./venv/
    source ./venv/bin/activate
    pip install -r requirements.txt
fi

echo "Activating environment..."
source ./venv/bin/activate
echo "Current python location:" "$(which python)"
