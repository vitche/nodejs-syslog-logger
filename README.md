# nodejs-syslog-logger
This library allows sending formatted log messages to the remote "syslogd" server.
## Configuration
Place the following values into your ".env" file:
```
SYSLOG_ADDRESS=
SYSLOG_PORT=
SYSLOG_COMPONENT_NAME=
```
Where "address" and "port" are corresponding UDP address and port and the "component name" is the string identifying the component for which you are logging.
## Sample usage
```
var logger = require('nodejs-syslog-logger');
logger.log(":)TEST.1:)");
logger.log(":)%s.2:)", "TEST");
logger.log(":)%s.%d:)", "TEST", 3);
```

