import log
from flask import Flask, request, jsonify, render_template
import json
import os, random, string
import texla_helper

app = Flask('texla_api', instance_relative_config=True)
# Load the default configuration
app.config.from_object('config')
# Load the configuration from the instance folder
#app.config.from_pyfile('config.py')

@app.route('/', methods=['GET', 'POST'])
def welcome():
    if request.method == 'POST':
        if request.form['sourceCode']:
            return request.form['sourceCode']
        elif request.files['sourceFile']:
            return 'Source fileeee'
    else:
        return render_template('index.html')

if __name__ == '__main__':
        app.run(host="127.0.0.1", port=5000)
