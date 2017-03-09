import logging
import sys
import json

from texla_lib.texla.Parser import Parser
from texla_lib.texla.Renderers.MediaWikiRenderer import MediaWikiRenderer
import texla_lib.texla.PageTree.Exporter as exporter


def convert_text_simple(text, lang):
    try:
        '''This function convert a tex document in a single
        wikitext output collapsing the content at the  -1 level'''
        config = {"input_path":"",
                  "output_path":"",
                  "doc_title":"texla_min",
                  "lang":lang,
                  "keywords":json.loads(
                      open('lang.txt').read())[lang],
                  "collapse_content_level":-1,
                  "base_path":'',
                  "create_index":0,
                  "plugins": ["MathCheck", "spaces_check"]
                  }
        logging.info('######## STARTING PARSING ########')
        p = Parser(config)
        tree = p.parse(text)
        n_blocks = tree.n_blocks()
        logging.info('PARSED %i Blocks', n_blocks)

        logging.info('######## STARTING RENDERING ########')
        #rendering
        rend = MediaWikiRenderer(config)
        rend.start_rendering(tree)
        #collpasing tree
        tree = rend.tree
        rend.tree.collapse_tree(config['collapse_content_level'], 4)
        #collapse the text in the right pages
        #getting text of root_page
        output_text = rend.tree.root_page.text
        logging.info('######## FINISHED ########')
    except:
        return "Some errors in your Latex file!"
    return output_text.strip()
