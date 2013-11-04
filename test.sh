#!/bin/bash -xe

if ! ./target/lib/phantomjs-1.9.2-linux-i686/bin/phantomjs --version; then
	set +e
	rm -rf target/lib
	mkdir target/lib -p
	set -e
	cd target/lib
	if file /sbin/init | grep "32-bit"; then
		wget https://phantomjs.googlecode.com/files/phantomjs-1.9.2-linux-i686.tar.bz2 -O phantomjs.tar.bz2
		tar xjf phantomjs.tar.bz2
		ln -s phantomjs-1.9.2-linux-i686 phantomjs
	else
		wget https://phantomjs.googlecode.com/files/phantomjs-1.9.2-linux-x86_64.tar.bz2 -O phantomjs.tar.bz2
		tar xjf phantomjs.tar.bz2
		ln -s phantomjs-1.9.2-linux-x86_64 phantomjs 
	fi
	cd -
	./target/lib/phantomjs/bin/phantomjs --version
fi

python -m SimpleHTTPServer 8084 &
sleep 1

BUILD_STATUS=FAIL
if ./target/lib/phantomjs/bin/phantomjs phantomjs-test/run-qunit.js http://localhost:8084/test/test.html; then
	BUILD_STATUS=SUCCESS
fi;
set +e
kill -9 %1
set -e

if [ "x$BUILD_STATUS" == "xSUCCESS" ]; then exit 0; fi

exit 1;

	







