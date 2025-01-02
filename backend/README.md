# WOW Centreville API

The backend of the WOW Centreville app.

## Setup

1. Install [Python 3.11+](https://www.python.org/)

2. Run the relevant activation script in your terminal (read the comments in `activate.sh` or `activate.ps1` depending on your operating system)

3. Add the following files to your venv in `venv/lib/python3.*/site-packages` and `venv/lib64/python3.*/site-packages` (where `python3.*` is whatever Python version is showing in the venv) if the directories exist:

   - This points Python to the location of our backend and allows us to import `api` as a module when running the shell and allows us to run python scripts that use our backend modules.

   a. `api.pth` - should contain the path to the `wow_backend` folder, ie ``/home/user/Documents/Projects/wow-centreville/backend/wow_backend`

   b. `backend.pth` - should contain the path to the `backend` folder, ie ``/home/user/Documents/Projects/wow-centreville/backend`

## Miscellaneous

- Format your code by running `ruff format ./` and view offending code by running `ruff check ./`.
- While developing, if your models ever change you'll need to make and migrate your database. You can do so by running `python manage.py makemigrations` and `python manage.py migrate`.
- If you ever need to test out some code, you can run your python shell with Django specific stuff loaded in by running `python manage.py shell`
