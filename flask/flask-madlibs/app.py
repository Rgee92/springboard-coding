from flask import Flask, render_template, request, redirect
from stories import *

app = Flask(__name__)

@app.route('/')
def home():
    base_story = story
    return render_template('home.html', story=base_story)

@app.route('/story')
def write_story():
    display_text = story.generate(request.args)
    return render_template('results.html', result=display_text)

@app.route('/create')
def create_page():
    return render_template('create.html')

@app.route('/create', methods=["POST"])
def create_madlib():
    global story
    madlib_template = request.form['text']
    prompts = parse_madlib(madlib_template)
    story = Story(prompts, madlib_template)
    print(story)
    return redirect("/")


def parse_madlib(text):
    """ Parses a madlib template, and returns a list of prompts
    
    >>>parse_madlib("Hello {place}!")
    ["place"]
    
    """
    prompts = []
    remain = text
    while(remain):
        x = remain.partition("{")
        x_end = x[2].find("}")
        x_res = x[2][:x_end]
        remain = remain.partition("}")[2]
        print(x_res, "-->", remain)
        if x_res:
            prompts.append(x_res)
    
    prompts = list(set(prompts))
    return prompts
