// SETUP =====================================================================
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

// CONSTRUCTOR ===============================================================
function AzureMobileServicesClient(adress, apikey){
	this.azureAdress = adress;
	this.azureApiKey = apikey;
}

// FUNCTIONS =================================================================

/**
 * Function Push Data to table in Azure Mobile Services
 * @param  {String}   table      Name of table
 * @param  {Object}   postObject Data to Push
 * @param  {Function} callback   In the first parameter you can see the Azure Mobile Services response
 */
AzureMobileServicesClient.prototype.pushToTable = function(table, postObject, callback) {
	var post_data = querystring.stringify(postObject);

	var post_options = {
		host: this.azureAdress,
		port: '80',
		path: '/tables/' + table + '/',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length,
			'X-ZUMO-APPLICATION': this.azureApiKey
		}
	};

	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			callback(chunk);
		});
	});

	post_req.write(post_data);
	post_req.end();
};

/**
 * Function Get Data From table in Azure Mobile Services
 * @param  {String}   table      Name of table
 * @param  {Function} callback   In the first parameter you can see the Azure Mobile Services response
 */
AzureMobileServicesClient.prototype.getTable = function(table, callback) {
	var post_options = {
		host: this.azureAdress,
		port: '80',
		path: '/tables/' + table + '/',
		method: 'GET',
		headers: {
			'X-ZUMO-APPLICATION': this.azureApiKey
		}
	};

	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			callback(chunk);
		});
	});

	post_req.end();
};

// EXPORT ====================================================================
module.exports = AzureMobileServicesClient;