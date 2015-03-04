#!/bin/bash -xe

MYCONTAINER=com.googlecode.mycontainer:mycontainer-maven-plugin:1.6.1-SNAPSHOT

mvn $MYCONTAINER:phantomjs-install
mvn $MYCONTAINER:web -Dmycontainer.web.waitfor=false -Dmycontainer.web.port=8084 
