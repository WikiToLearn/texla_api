import log
from flask import Flask, request, jsonify, render_template
import json
import os, random, string
from texla.Parser import Parser
from texla.Renderers.MediaWikiRenderer import MediaWikiRenderer

app = Flask('texla_api', instance_relative_config=True)
# Load the default configuration
app.config.from_object('config')
# Load the configuration from the instance folder
app.config.from_pyfile('config.py')

@app.route('/')
def welcome():
    return render_template('index.html')

if __name__ == '__main__':
        app.run(host="127.0.0.1", port=5000)
