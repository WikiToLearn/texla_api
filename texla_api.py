import texla_lib.log
from flask import Flask, request, jsonify, render_template
from werkzeug import secure_filename
import json
import os, random, string
import texla_helper as converter

app = Flask('texla_api', instance_relative_config=True)
# Load the default configuration
app.config.from_object('config')
# Load the configuration from the instance folder
#app.config.from_pyfile('config.py')
ALLOWED_EXTENSIONS = set(['tex'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET'])
def welcome():
        return render_template('index.template')

@app.route('/convert', methods=['POST'])
def convert():
    if request.method == 'POST':
        if request.form['sourceCode']:
            return converter.convert_text_simple(request.form['sourceCode'], request.form['lang'])
        elif request.files['sourceFile'] and allowed_file(request.files['sourceFile'].filename):
            f = request.files['sourceFile'].read()
            return converter.convert_text_simple(f, request.form['lang'])

if __name__ == '__main__':
        app.run(host="127.0.0.1", port=5000)
