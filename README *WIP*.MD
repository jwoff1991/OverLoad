# OVERLOAD

Welcome to OverLoad, a Medium clone. Feel free to browse the site. You can create a login or signin as the demo user to utilize all the functionality.


https://aacapstoneproj.onrender.com

# Index


-Database Schema and backend routes: https://github.com/jwoff1991/OverLoad/wiki/Database-Schema-and-Backend-Routes
- User Articles: https://github.com/jwoff1991/OverLoad/wiki/User-Articles
- Wireframes : https://github.com/jwoff1991/OverLoad/wiki/Wireframes


-[screenshots/landingpage.png]
-[screenshots/articles.png]
-[screenshots/readingList.png]
-[screenshots/create.png]

## Getting Started

1. Install dependencies

```
pipenv install -r requirements.txt
```

2. Create a .env file based on the example with proper settings for your development environment

3. Make sure the SQLite3 database connection URL is in the .env file

4. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```
pipenv shell
flask db upgrade
flask seed all
flask run

To run the React App in development, checkout the README inside the react-app directory.

## Get in Touch with the Developer:
- John Wofford: https://www.linkedin.com/in/jonathanbwofford/
