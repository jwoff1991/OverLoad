import os
from flask import Flask, render_template, request, session, redirect, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.comment_routes import comment_routes
from .api.reading_list_route import reading_list_routes
from .api.article_likes import article_like_routes
from .seeds import seed_commands
from .config import Config
from .api.article_routes import article_routes

app = Flask(__name__, static_folder='./disc', static_url_path='')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(article_routes, url_prefix='/api/articles')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(reading_list_routes, url_prefix='/api/reading-list')
app.register_blueprint(article_like_routes, url_prefix='/api/article-likes')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = {rule.rule: [[method for method in rule.methods if method in acceptable_methods],
                              app.view_functions[rule.endpoint].__doc__]
                  for rule in app.url_map.iter_rules() if rule.endpoint != 'static'}
    return route_list


@app.route('/')
def index():
    """
    Serve the index.html file from the 'disc' directory
    """
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:filename>')
def static_files(filename):
    """
    Serve other static files (like CSS, JavaScript, etc.) from the 'disc' directory
    """
    return send_from_directory(app.static_folder, filename)

@app.errorhandler(404)
def not_found(e):
    """
    If route not found, serve index.html to let the Vue Router handle the routing
    """
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
