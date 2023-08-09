module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'cypress/globals':true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true,
				'jest':true
			},
			'files': [
				'.eslintrc.{js,cjs}',
				'**/*.spec.js',
				'**/*.spec.jsx'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'jest-dom',
		'cypress'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off'
	}
}
