from flask import Flask, redirect, url_for, render_template, request, session, json, flash
from flask_bootstrap import Bootstrap
# import flask.ext.sass
from datetime import timedelta
# from second import second


app = Flask('app')
# from flask.ext.sass import sass
# sass(app, input_dir='assets/scss', output_dir='css')

import sys, os
sys.path.insert(0, os.getcwd()+"./api")

app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(minutes=2)

@app.route('/')
def hello_world():
    return render_template("base.html")

@app.route("/login", methods = ['GET', 'POST'])
def login():
    if request.method == "POST":
        session.permanent = True
        user = request.form["nm"]
        session["user"] = user
        return redirect(url_for("user"))
    else:
        if "user" in session:
            return redirect(url_for("user"))

        return render_template("login.html")

@app.route("/signup", methods=["POST", "GET"])
def signup():
  if request.method == "POST":
        session.permanent = True
        user = request.form["nm"]
        session["user"] = user
        return redirect(url_for("user"))
  else:
        if "user" in session:
            return redirect(url_for("user"))

        return render_template("signup.html")

@app.route("/user")
def user():
    if "user" in session:
        user = session["user"]
        return render_template("user.html", usr=user)
    else:
        return redirect(url_for("login"))

@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("you have logged out", "info")
    return redirect(url_for("login"))

@app.route("/songs", methods=['POST','GET'])
def songs():
  if request.method == 'POST':
        session.permanent = True
        user = request.form["nm"]
        session["user"] = user
        return redirect(url_for("user"))
  elif request.method == 'GET':
        if "user" in session:
            return redirect(url_for("user"))
        
        return render_template("songs.html")

def getsongs():
  return render_template("songs.html")
  
def showjson():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static/api", "songs.json")
    data = json.load(open(json_url))
    return render_template('playlist.html', data=data)

@app.route("/playlist")
def playlist():
  return render_template('playlist.html')
      
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
