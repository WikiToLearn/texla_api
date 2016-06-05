import texla_lib.log
from flask import Flask, request, jsonify, render_template
import json
import os, random, string
import texla_helper as converter

app = Flask('texla_api', instance_relative_config=True)
# Load the default configuration
app.config.from_object('config')
# Load the configuration from the instance folder
#app.config.from_pyfile('config.py')

@app.route('/', methods=['GET', 'POST'])
def welcome():
    if request.method == 'POST':
        if request.form['sourceCode']:
            return converter.convert_text_simple(request.form['sourceCode'], request.form['lang'])
        elif request.files['sourceFile']:
            return 'Source file'
    else:
        return render_template('index.template')

if __name__ == '__main__':
        app.run(host="0.0.0.0", port=80)
