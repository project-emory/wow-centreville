# This script automatically checks if a virtual environment named `venv` exists
# in the project, creating and installing dependencies if it doesn't and
# activating the virtual environment if it does.
# Requirements: python 3.11
# Usage: . .\setup.ps1

if (-not (Test-Path -Path ".\venv")) {
    Write-Host "Installing dependencies..."
    python -m venv .\venv
    .\venv\Scripts\Activate.ps1
    pip install -r requirements.txt
}

Write-Host "Activating environment..."
.\venv\Scripts\Activate.ps1
Write-Host "Current python location:" (Get-Command python).Source
