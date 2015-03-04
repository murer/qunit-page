#!/bin/bash -e

SERVER=x

finish() {
	if [ "x$SERVER" != "xx" ]; then
		echo "Shutting down server"
		kill -9 "$SERVER" || true
	fi
}
trap finish EXIT

if ! ./target/lib/phantomjs-1.9.2-linux-i686/bin/phantomjs --version 2>/dev/null && \
	! ./target/lib/phantomjs-1.9.2-linux-x86_64/bin/phantomjs --version 2>/dev/null; then
	echo "Downloading phantomjs"
	rm -rf target/lib || true
	mkdir target/lib -p || true
	cd target/lib
	if file /sbin/init | grep "32-bit"; then
		wget https://phantomjs.googlecode.com/files/phantomjs-1.9.2-linux-i686.tar.bz2 \
			-O phantomjs.tar.bz2 --progress=dot:mega
		tar xjf phantomjs.tar.bz2
		ln -s phantomjs-1.9.2-linux-i686 phantomjs
	else
		wget https://phantomjs.googlecode.com/files/phantomjs-1.9.2-linux-x86_64.tar.bz2 \
			-O phantomjs.tar.bz2 --progress=dot:mega
		tar xjf phantomjs.tar.bz2
		ln -s phantomjs-1.9.2-linux-x86_64 phantomjs 
	fi
	cd -
	./target/lib/phantomjs/bin/phantomjs --version
fi

python -m SimpleHTTPServer 8084 & SERVER=$!
sleep 1

./target/lib/phantomjs/bin/phantomjs \
	phantomjs-test/run-qunit.js \
	http://localhost:8084/test/test.html

	







