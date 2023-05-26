run:
	# install air: go install github.com/cosmtrek/air@latest
	# $GOPATH should be set
	${GOPATH}/bin/air

db:
	sudo service postgresql start