# Put your app in here.
import operations
from flask import Flask
from flask import request

app = Flask(__name__)

op = {
    "add": operations.add,
    "sub": operations.sub,
    "mult": operations.mult,
    "div": operations.div
}

@app.route('/<operation>')
@app.route('/math/<operation>')
def do_math(operation):
    a = int(request.args["a"])
    b = int(request.args["b"])
    fn = op[operation]
    return f"{fn(a,b)}"
