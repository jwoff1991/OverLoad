## OVERLOAD


Welcome to OverLoad, a Medium clone. Feel free to browse the site. You can create a login or signin as the demo user to utilize all the functionality.


https://aacapstoneproj.onrender.com


# Docker

Frontend: https://hub.docker.com/r/jwoff91/overload-frontend

Backend: https://hub.docker.com/r/jwoff91/overload-backend

# Index


-Database Schema and backend routes: https://github.com/jwoff1991/OverLoad/wiki/Database-Schema-and-Backend-Routes
- User Articles: https://github.com/jwoff1991/OverLoad/wiki/User-Articles
- Wireframes : https://github.com/jwoff1991/OverLoad/wiki/Wireframes


# Technologies Used
![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)


# Screenshots

![home]

[home]: ./screenshots/landingpage.png

![articles]

[articles]: ./screenshots/articles.png

![readingList]

[readingList]: ./screenshots/readingList.png

![create]

[create]: ./screenshots/create.png

## Getting Started

1. Install dependencies

```
pipenv install -r requirements.txt
```
```bash
pipenv install Flask
```

```bash
pipenv install python-dotenv
```

```bash
pipenv install Jinja2
```

```bash
pipenv install Flask-WTF
```

```bash
pipenv install SQLAlchemy Flask-SQLAlchemy
```

```bash
pipenv install alembic Flask-Migrate
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
```

To run the React App in development, checkout the README inside the react-app directory.

## Get in Touch with the Developer:
- John Wofford: https://www.linkedin.com/in/jonathanbwofford/
