'''Default Block'''
import logging
from .Utilities import *
from .Block import Block

class DefaultBlock(Block):
	''' This Block is used when the parser doesn't find
	a proper parser_hook to call for a matched env or command'''

	@staticmethod
	def parse_env(parser ,tex, parent_block, params):
		#getting the name of env
		if 'env' in params:
			env_name = params['env']
		else:
			env_name = 'no_env'
		if 'star' in params:
			env_name = env_name + '*' if params['star'] else env_name
		#default block is created
		logging.debug('DefaultBlock.parse_env @ %s:',tex[:5]+'...')
		block = DefaultBlock(tex, env_name, parent_block)
		#We cannot look inside tex, we don't know
		#what to parser.
		#we return the block
		return block

	@staticmethod
	def parse_cmd(parser ,tex, parent_block, params):
		cmd = params['cmd']
		cmd = cmd + '*' if params['star'] else cmd
		#the options has to be matched from the tex
		match = CommandParser.get_command_options(tex)
		#match is (options string, left tex
		ptex = '\\'+cmd+match[0]
		logging.debug('DefaultBlock.parse_cmd @ %s:',ptex)
		#default block is created
		block = DefaultBlock(ptex, cmd, parent_block)
		#we return the block and the left tex to parse
		return (block, match[1])

	def __init__(self, tex, block_name, parent_block):
		'''
		Constructor for sections:
		-title: main title
		-index_title: title for table of content
		-numbered: True/False
		-level: sections level
		-parent_block
		'''
		#base constructor for Block. It created the id
		#nd basic data structures
		super().__init__('default-'+block_name, tex, parent_block)
		#the tex is added also as attribute
		self.attributes['content'] = tex


parser_hooks = {
	'default_env' : DefaultBlock.parse_env,
	'default_cmd' : DefaultBlock.parse_cmd,
	}
