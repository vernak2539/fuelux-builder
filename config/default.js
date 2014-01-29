module.exports = {
	port: 4000,
	ui: {
		publicDir: '/public-optimized',
		staticBase: '/'
	},
	mongo: {
		useVCAP: true,
		host: '127.0.0.1',
		port: 27017,
		dbname: 'test-build-for-files-db' // this db will be created if it's not there already. Good thing? Depends on what you're doing
	}
};
