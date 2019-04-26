from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("/home.html")

@app.route('/browse.html')
def browse():
    return render_template("/browse.html")

@app.route('/thisbuild.html')
def thisbuild():
    return render_template("/thisbuild.html")

if __name__ == '__main__':
    app.run(debug=True)
