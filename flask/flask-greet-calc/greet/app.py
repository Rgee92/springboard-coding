from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    return "Welcome!"

@app.route('/welcome/<location>')
def welcome_loc(location):
    return f"Welcome {location}"
