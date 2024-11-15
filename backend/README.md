# WOW Centreville API

The backend of the WOW Centreville app.

## Setup

1. Install [Python 3.11+](https://www.python.org/)

2. Run the relevant activation script in your terminal (read the comments in `activate.sh` or `activate.ps1` depending on your operating system)

## Miscellaneous

- Format your code by running `ruff format ./` and view offending code by running `ruff check ./`.
- While developing, if your models ever change you'll need to make and migrate your database. You can do so by running `python manage.py makemigrations` and `python manage.py migrate`.
- If you ever need to test out some code, you can run your python shell with Django specific stuff loaded in by running `python manage.py shell`
- If you have issues running any python scripts directly in your terminal, you will need to add both `wow_backend` and `backend` to your path in your venv - contact [andrewtlu](https://github.com/andrewtlu) for help there.
