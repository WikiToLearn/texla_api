import texla_lib.log
import logging
from flask import Flask, request, jsonify, render_template
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

@app.route('/contact_us', methods=['GET'])
def contact_us():
    return render_template('contact_us.template')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.template')

@app.route('/convert', methods=['POST'])
def convert():
    if request.method == 'POST':
        if request.form['sourceCode']:
            result = converter.convert_text_simple(request.form['sourceCode'], request.form['lang'])
            return jsonify(wikitext=result)
        elif request.files['sourceFile'] and allowed_file(request.files['sourceFile'].filename):
            text = request.files['sourceFile'].read().decode('utf-8')
            result = converter.convert_text_simple(text, request.form['lang'])
            return jsonify(wikitext=result)

if __name__ == '__main__':
        app.run(host="0.0.0.0", port=80)
