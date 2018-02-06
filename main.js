require("dotenv").config();
var util = require("util");
var syslog = require("syslog-client");
var client = syslog.createClient(process.env.SYSLOG_ADDRESS, {
	syslogHostname: process.env.SYSLOG_COMPONENT_NAME,
	transport: syslog.Transport.Udp,
	port: process.env.SYSLOG_PORT
});
module.exports.log = function() {
	var message = util.format.apply(null, arguments);
	client.log(message, {
		facility: syslog.Facility.Daemon,
		severity: syslog.Severity.Critical
	}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log(message);
		}
	});		
};
