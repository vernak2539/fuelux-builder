'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'fuelux-custom-builds' };
        
        res.render('index', model);
        
    });

};
