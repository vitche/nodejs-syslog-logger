require("dotenv").config();
var util = require("util");
var syslog = require("syslog-client");
var client = undefined;
var serverAddress = process.env.SYSLOG_ADDRESS;
var serverPort = process.env.SYSLOG_PORT;
var componentName = process.env.SYSLOG_COMPONENT_NAME;
if (serverAddress && serverPort && componentName) {
	client = syslog.createClient(serverAddress, {
		syslogHostname: componentName,
		transport: syslog.Transport.Udp,
		port: serverPort
	});
}
module.exports.log = function() {
	var message = util.format.apply(null, arguments);
	client.log(message, {
		facility: syslog.Facility.Daemon,
		severity: syslog.Severity.Critical
	}, function(error) {
		// Do not call "console" methods when they were overriden
		if (module.exports.log === console.log || module.exports.log === console.error) {
			return;
		}
		if (error) {
			console.error(error);
		} else {
			console.log(message);
		}
	});
};
module.exports.replaceConsoleError = function () {
	if(!client) {
		return;
	}
	console.error = module.exports.log;
};
module.exports.replaceConsoleLog = function () {
	if(!client) {
		return;
	}
	console.log = module.exports.log;
};
