/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    
    definition: function(req, res) {
        res.json(Test.definition);
    }

};

