#!/bin/bash -xe

if ! ./target/lib/phantomjs-1.9.2-linux-i686/bin/phantomjs --version; then
	set +e
	rm -rf target/lib
	mkdir target/lib -p
	set -e
	cd target/lib
	wget https://phantomjs.googlecode.com/files/phantomjs-1.9.2-linux-i686.tar.bz2 -O phantomjs.tar.bz2
	tar xjf phantomjs.tar.bz2
	cd -
	ls ./target/lib/phantomjs-1.9.2-linux-i686/bin/phantomjs
	./target/lib/phantomjs-1.9.2-linux-i686/bin/phantomjs --version
fi

./target/lib/phantomjs-1.9.2-linux-i686/bin/phantomjs phantomjs-test/run-qunit.js http://localhost:8084/test/test.html
	







